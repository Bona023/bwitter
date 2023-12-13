import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
`;
const TextArea = styled.textarea`
    border: 2px solid ${(props) => props.theme.inputBg};
    padding: 20px;
    border-radius: 10px;
    font-size: 16px;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.inputBg};
    width: 100%;
    resize: none;
    margin-bottom: 10px;
    font-family: "Sunflower", sans-serif;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.pointColor};
    }
`;
const BtnBox = styled.div`
    padding: 5px 0;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    height: 40px;
    span {
        font-size: 14px;
        font-weight: 300;
        max-height: 40px;
        max-width: 270px;
        overflow: auto;
    }
`;
const AttachFileBtn = styled.label`
    background-color: ${(props) => props.theme.btnBgNormal};
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.btnBgActive};
        color: ${(props) => props.theme.tweetAccent};
    }
`;
const AttachFileInput = styled.input`
    display: none;
`;
const SubmitBtn = styled.input`
    font-size: 16px;
    font-family: "Sunflower", sans-serif;
    border: none;
    background-color: ${(props) => props.theme.btnBgNormal};
    border-radius: 5px;
    padding: 10px;
    line-height: 1;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.btnBgActive};
        color: ${(props) => props.theme.tweetAccent};
    }
`;

export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || tweet === "" || tweet.length > 180) return;
        if (file && file.size > 2097152) {
            alert("이미지 크기는 최대 2MB 입니다.");
            return;
        }
        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                writer: user.displayName || "Anonymous",
                userId: user.uid,
                userAvatar: user.photoURL,
            });
            if (file) {
                const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, { photo: url });
            }
            setTweet("");
            setFile(null);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form onSubmit={onSubmit}>
            <TextArea
                required
                rows={5}
                maxLength={180}
                onChange={onChange}
                value={tweet}
                placeholder="지금 무슨 일이 일어나고 있나요? (최대 180자)"
            />
            <BtnBox>
                {file ? (
                    <span>
                        파일명:{file.name} / 크기:
                        {file.size < 1024 ? file.size + "bytes" : file.size < 1048576 ? (file.size / 1024).toFixed(1) + "KB" : file.size >= 1048576 ? (file.size / 1048576).toFixed(1) + "MB" : null}
                    </span>
                ) : null}
                <AttachFileBtn htmlFor="file">이미지 추가</AttachFileBtn>
                <AttachFileInput
                    type="file"
                    onChange={onFileChange}
                    id="file"
                    accept="image/*"
                />
                <SubmitBtn
                    type="submit"
                    value={isLoading ? "포스팅 중..." : "게시하기"}
                />
            </BtnBox>
        </Form>
    );
}

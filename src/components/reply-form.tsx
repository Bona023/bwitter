import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

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

export default function ReplyForm({ docId }: any) {
    const [isLoading, setLoading] = useState(false);
    const [reply, setReply] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(e.target.value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || reply === "" || reply.length > 180) return;
        try {
            setLoading(true);
            await addDoc(collection(db, `tweets/${docId}/replies`), {
                reply,
                createdAt: Date.now(),
                writer: user.displayName || "Anonymous",
                userId: user.uid,
                userAvatar: user.photoURL,
            });
            setReply("");
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
                rows={1}
                maxLength={180}
                onChange={onChange}
                value={reply}
                placeholder="댓글을 작성해 주세요."
            />
            <BtnBox>
                <SubmitBtn
                    type="submit"
                    value={isLoading ? "포스팅 중..." : "댓글 달기"}
                />
            </BtnBox>
        </Form>
    );
}

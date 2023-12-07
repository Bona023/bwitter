import { useState } from "react";
import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.tweetBg};
    color: ${(props) => props.theme.text};
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    border-radius: 10px;
`;
const UserProfile = styled.div`
    display: flex;
    justify-content: end;
`;
const ProfileImg = styled.div`
    background-color: ${(props) => props.theme.pointColor};
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-top: 10px;
`;
const Contents = styled.div`
    padding: 15px;
    width: 100%;
`;
const NameAndTime = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;
const WriterName = styled.span`
    font-size: 16px;
    font-weight: 700;
`;
const CreateAt = styled.span`
    font-size: 12px;
    font-weight: 300;
`;
const Blah = styled.p`
    margin: 10px 0;
    font-size: 14px;
`;
const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 5px;
    margin: 5px 0;
`;
const Edit = styled.textarea`
    width: 100%;
    font-family: "Sunflower", sans-serif;
    font-size: 14px;
    resize: none;
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.pointColor};
    border-radius: 10px;
    padding-top: 15px;
    padding-left: 15px;
    &:focus {
        outline: none;
        background-color: ${(props) => props.theme.bodyBg};
    }
`;
const EditBtn = styled.input`
    font-size: 14px;
    font-family: "Sunflower", sans-serif;
    border: none;
    background-color: ${(props) => props.theme.btnBgD};
    border-radius: 5px;
    padding: 10px;
    line-height: 1;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.btnBgL};
    }
`;
const Photo = styled.img`
    border-radius: 10px;
    width: 100%;
`;
const Icons = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    svg {
        width: 30px;
        cursor: pointer;
        color: ${(props) => props.theme.tweetAccent};
        stroke-width: 2.5px;
        &.tweetDel {
            color: red;
        }
    }
`;

export default function Tweet({ photo, tweet, writer, userId, createAt, id }: ITweet) {
    const user = auth.currentUser;
    const [edit, setEdit] = useState(false);
    const [blah, setBlah] = useState(tweet);
    const [isLoading, setLoading] = useState(false);
    const createTime = () => {
        const msc = Date.now() - createAt;
        if (msc / (1000 * 60) < 60) {
            return Math.floor(msc / (1000 * 60)) + "분 전";
        } else if (msc / (1000 * 60 * 60) < 24) {
            return Math.floor(msc / (1000 * 60 * 60)) + "시간 전";
        } else {
            const now = new Date(createAt);
            return now.getFullYear() + "년 " + (now.getMonth() + 1) + "월 " + now.getDate() + "일";
        }
    };
    const onDelete = async () => {
        const ok = confirm("이 트윗을 삭제 하시겠습니까?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id));
            if (photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {
            //
        }
    };
    const openMod = () => {
        if (edit) {
            setEdit(false);
            setBlah(tweet);
        } else {
            setEdit(true);
        }
    };
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBlah(e.target.value);
    };
    const tweetModify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateDoc(doc(db, "tweets", id), { tweet: blah });
            setBlah("");
            setEdit(false);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Wrapper>
            <UserProfile>
                <ProfileImg />
            </UserProfile>
            <Contents>
                <NameAndTime>
                    <WriterName>{writer}</WriterName>
                    <CreateAt>{createTime()}</CreateAt>
                </NameAndTime>
                {edit ? (
                    <EditForm onSubmit={tweetModify}>
                        <Edit
                            onChange={onChange}
                            value={blah}
                        />
                        <EditBtn
                            type="submit"
                            value={isLoading ? "로딩중..." : "메시지 수정하기"}
                        />
                    </EditForm>
                ) : (
                    <Blah>{tweet}</Blah>
                )}
                {photo ? <Photo src={photo} /> : null}
            </Contents>
            <Icons>
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                    />
                </svg>
                {user?.uid === userId ? (
                    <svg
                        onClick={openMod}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                ) : null}
                {user?.uid === userId ? (
                    <svg
                        onClick={onDelete}
                        className="tweetDel"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : null}
            </Icons>
        </Wrapper>
    );
}

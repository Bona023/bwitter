import styled from "styled-components";
import { auth, db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { IReply } from "./replies";

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
    padding-left: 10px;
`;
const ProfileImg = styled.div`
    background-color: ${(props) => props.theme.pointColor};
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-top: 10px;
`;
const AvatarImg = styled.img`
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
        color: ${(props) => props.theme.tweetIcon};
        stroke-width: 2.5px;
        &.tweetDel {
            color: ${(props) => props.theme.accentColor};
        }
        &:hover {
            color: ${(props) => props.theme.tweetAccent};
        }
    }
`;

export default function Reply({ reply, writer, userId, userAvatar, createdAt, replyId, docId }: IReply) {
    const user = auth.currentUser;
    const createTime = () => {
        const msc = Date.now() - createdAt;
        if (msc / (1000 * 60) < 60) {
            return Math.floor(msc / (1000 * 60)) + "분 전";
        } else if (msc / (1000 * 60 * 60) < 24) {
            return Math.floor(msc / (1000 * 60 * 60)) + "시간 전";
        } else {
            const now = new Date(createdAt);
            return now.getFullYear() + "년 " + (now.getMonth() + 1) + "월 " + now.getDate() + "일";
        }
    };
    const onDelete = async () => {
        const ok = confirm("이 댓글을 삭제 하시겠습니까?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, `tweets/${docId}`, replyId));
        } catch (e) {
            console.log(e);
        } finally {
            //
        }
    };
    return (
        <Wrapper>
            <UserProfile>{userAvatar ? <AvatarImg src={userAvatar} /> : <ProfileImg />}</UserProfile>
            <Contents>
                <NameAndTime>
                    <WriterName>{writer}</WriterName>
                    <CreateAt>{createTime()}</CreateAt>
                </NameAndTime>
                <Blah>{reply}</Blah>
            </Contents>
            <Icons>
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

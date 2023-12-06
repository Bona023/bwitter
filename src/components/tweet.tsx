import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.tweetBg};
    color: ${(props) => props.theme.text};
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    margin-bottom: 10px;
    border-radius: 10px;
`;
const UserProfile = styled.div`
    display: flex;
    justify-content: end;
`;
const ProfileImg = styled.div`
    background-color: aquamarine;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-top: 10px;
`;
const Contents = styled.div`
    padding: 15px;
    width: 100%;
`;
const WriterName = styled.span`
    font-weight: 700;
    font-size: 16px;
`;
const Blah = styled.p`
    margin: 10px 0;
    font-size: 14px;
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
    }
`;

export default function Tweet({ photo, tweet, writer, userId, createAt }: ITweet) {
    return (
        <Wrapper>
            <UserProfile>
                <ProfileImg />
            </UserProfile>
            <Contents>
                <WriterName>{writer}</WriterName>
                <Blah>{tweet}</Blah>
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
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
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
            </Icons>
        </Wrapper>
    );
}

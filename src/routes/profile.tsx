import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import { useSetRecoilState } from "recoil";
import { usernameAtom } from "../atom";

const Wrapper = styled.div`
    overflow-x: scroll;
    position: relative;
`;
const ProfileBox = styled.div`
    position: relative;
    width: 100%;
    height: 310px;
    display: flex;
    justify-content: center;
`;
const ProfileBgUpload = styled.label`
    position: absolute;
    top: 0;
    width: 100%;
    height: 200px;
    background-color: ${(props) => props.theme.inputBg};
    cursor: pointer;
`;
const ProfileInput = styled.input`
    display: none;
`;
const ProfileBgImg = styled.img`
    width: 100%;
    height: 200px;
`;
const AvatarUpload = styled.label`
    position: absolute;
    top: 100px;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border: 3px solid ${(props) => props.theme.bodyBg};
    overflow: hidden;
    background-color: ${(props) => props.theme.pointColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        width: 130px;
        color: ${(props) => props.theme.tweetAccent};
    }
`;
const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;
const AvatarInput = styled.input`
    display: none;
`;
const UserInfo = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: end;
    padding: 0 20px;
`;
const UserName = styled.div`
    height: 38px;
    display: flex;
    gap: 3px;
    align-items: flex-end;
    span {
        display: inline-block;
        font-size: 24px;
        font-weight: 700;
        padding-left: 16px;
    }
    svg {
        display: inline-block;
        cursor: pointer;
        width: 16px;
        height: 16px;
    }
`;
const TabButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 30px;
`;
const ProfileTab = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.pointColor};
        color: ${(props) => props.theme.tweetAccent};
    }
`;
const Tweets = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
    padding: 10px;
`;
const NameUpdateForm = styled.form``;
const NameInput = styled.input`
    font-family: "Sunflower", sans-serif;
    font-size: 20px;
    background-color: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.text};
    border: none;
    border-radius: 15px;
    padding: 5px;
    width: 100px;
    text-align: center;
    margin-right: 5px;
    &:focus {
        outline: none;
    }
`;
const NameEditBtn = styled.input`
    font-family: "Sunflower", sans-serif;
    font-size: 16px;
    background-color: transparent;
    color: ${(props) => props.theme.text};
    border: none;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.accentColor};
    }
`;

export default function Profile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [editOpen, setEditOpen] = useState(false);
    const [userName, setUserName] = useState(user?.displayName ?? "");
    const [profileBg, setProfileBg] = useState("");
    const profileCheck = async () => {
        if (!user) return;
        const docRef = doc(db, "profile", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProfileBg(docSnap.data().profileBgPhoto);
        } else {
            setProfileBg("");
        }
    };
    const onProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            if (file.size > 4194304) {
                alert("파일크기가 4MB 이상입니다.");
                return;
            }
            const locationRef = ref(storage, `profile/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const profileUrl = await getDownloadURL(result.ref);
            setProfileBg(profileUrl);
            const docRef = doc(db, "profile", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                await updateDoc(docRef, { profileBgPhoto: profileUrl });
            } else {
                await setDoc(doc(db, "profile", user.uid), { profileBgPhoto: profileUrl });
            }
        }
    };
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            if (file.size > 4194304) {
                alert("파일크기가 4MB 이상입니다.");
                return;
            }
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, { photoURL: avatarUrl });
        }
    };
    const fetchTweets = async () => {
        const tweetQuery = query(collection(db, "tweets"), where("userId", "==", user?.uid), orderBy("createdAt", "desc"), limit(25));
        const snapshot = await getDocs(tweetQuery);
        const tweets = snapshot.docs.map((doc) => {
            const { tweet, createdAt, userId, writer, photo } = doc.data();
            return {
                tweet,
                createdAt,
                userId,
                writer,
                photo,
                id: doc.id,
            };
        });
        setTweets(tweets);
    };
    useEffect(() => {
        fetchTweets();
        profileCheck();
    }, []);
    const nameEditOpen = () => {
        setEditOpen(true);
    };
    const nameEditClose = () => {
        setEditOpen(false);
    };
    const nameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const nameAtomChange = useSetRecoilState(usernameAtom);
    const nameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;
        await updateProfile(user, { displayName: userName });
        nameAtomChange(userName);
        const myTweetQuery = query(collection(db, "tweets"), where("userId", "==", user?.uid));
        const snapshot = getDocs(myTweetQuery);
        (await snapshot).docs.map((item) => {
            updateDoc(doc(db, "tweets", item.id), { writer: userName });
        });
        fetchTweets();
        setEditOpen(false);
    };
    return (
        <Wrapper>
            <ProfileBox>
                <ProfileBgUpload htmlFor="profile">
                    <ProfileInput
                        onChange={onProfileChange}
                        id="profile"
                        type="file"
                        accept="image/*"
                    />
                    {profileBg === "" ? null : <ProfileBgImg src={profileBg} />}
                </ProfileBgUpload>
                <AvatarUpload htmlFor="avatar">
                    {avatar ? (
                        <AvatarImg src={avatar} />
                    ) : (
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            />
                        </svg>
                    )}
                </AvatarUpload>
                <AvatarInput
                    onChange={onAvatarChange}
                    id="avatar"
                    type="file"
                    accept="image/*"
                />
            </ProfileBox>
            <UserInfo>
                {editOpen ? (
                    <NameUpdateForm onSubmit={nameSubmit}>
                        <NameInput
                            type="text"
                            onChange={nameChange}
                            value={userName}
                        />
                        <NameEditBtn
                            type="submit"
                            value="수정"
                        />
                        <span>/</span>
                        <NameEditBtn
                            onClick={nameEditClose}
                            type="button"
                            value="취소"
                        />
                    </NameUpdateForm>
                ) : (
                    <UserName>
                        <span>{user?.displayName ?? "Anonymous"}</span>
                        <svg
                            onClick={nameEditOpen}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                    </UserName>
                )}
            </UserInfo>
            <TabButtons>
                <ProfileTab className="myTweets">게시물</ProfileTab>
                <ProfileTab className="myReplies">답글</ProfileTab>
                <ProfileTab className="myLikes">마음에 들어요</ProfileTab>
            </TabButtons>
            <Tweets>
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        {...tweet}
                    />
                ))}
            </Tweets>
        </Wrapper>
    );
}

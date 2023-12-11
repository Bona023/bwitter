import styled from "styled-components";
import { auth, storage } from "../firebase";
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Wrapper = styled.div``;
const ProfileBox = styled.div`
    position: relative;
    width: 100%;
    height: 310px;
    display: flex;
    justify-content: center;
`;
const ProfileBg = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 200px;
    background-color: ${(props) => props.theme.inputBg};
`;
/*const ProfileBgImg = styled.img`
    width: 100%;
    height: 200px;
`;*/
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
    justify-content: space-between;
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
    }
    svg {
        display: inline-block;
        cursor: pointer;
        width: 16px;
        height: 16px;
    }
`;
const ProfileUpdateBtn = styled.div`
    font-size: 18px;
    display: block;
    background-color: ${(props) => props.theme.btnBgNormal};
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
    &:hover {
        background-color: ${(props) => props.theme.btnBgActive};
        color: ${(props) => props.theme.tweetAccent};
    }
`;

export default function Profile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
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

    return (
        <Wrapper>
            <ProfileBox>
                <ProfileBg></ProfileBg>
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
                <UserName>
                    <span>{user?.displayName ?? "Anonymous"}</span>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                </UserName>
                <ProfileUpdateBtn>프로필 수정</ProfileUpdateBtn>
            </UserInfo>
        </Wrapper>
    );
}

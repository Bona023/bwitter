import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useRecoilState } from "recoil";
import { darkMode } from "../atom";

const Wrapper = styled.div`
    width: 100%;
    max-width: 840px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 0 50px;
`;
const Logo = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
`;
const LogoImg = styled.img`
    height: 100%;
`;
const MenuList = styled.div`
    padding-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(200, 200, 200);
`;
const Menu = styled.div`
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 25px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.pointColor};
        color: ${(props) => props.theme.tweetAccent};
    }
    svg {
        width: 25px;
        margin-right: 10px;
    }
    span {
        font-size: 20px;
    }
`;
const MLink = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.text};
`;
const UserInfo = styled.div`
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 40px;
    font-size: 16px;
    margin-top: 50px;
    gap: 10px;
    span {
        font-size: 16px;
        font-weight: 700;
    }
`;
const UserAvatar = styled.div`
    background-color: ${(props) => props.theme.tweetBg};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 25px;
    }
`;
const AvatarImg = styled.img`
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50px;
`;
const ModeSwitchBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background-color: ${(props) => props.theme.tweetIcon};
    color: ${(props) => props.theme.tweetAccent};
    padding: 10px 35px;
    border-radius: 20px;
    margin: 20px auto;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
        scale: 0.8;
    }
    svg {
        width: 20px;
        margin-right: 5px;
    }
`;

export default function Layout() {
    const navigate = useNavigate();
    const onLogout = async () => {
        const logoutOk = confirm("로그아웃 하시겠습니까?");
        if (logoutOk) {
            await auth.signOut();
            navigate("/login");
        }
    };
    const [isDark, setIsDark] = useRecoilState(darkMode);
    const modeSwitch = () => {
        setIsDark((prev) => !prev);
    };
    const user = auth.currentUser;
    return (
        <Wrapper>
            <MenuList>
                <Logo>
                    <LogoImg src="/free-sticker-window-4288987.png" />
                </Logo>
                <MLink to="/">
                    <Menu>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        <span>홈</span>
                    </Menu>
                </MLink>
                <MLink to="/profile">
                    <Menu>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            />
                        </svg>
                        <span>프로필</span>
                    </Menu>
                </MLink>
                <Menu onClick={onLogout}>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                        />
                    </svg>
                    <span>로그아웃</span>
                </Menu>
                {isDark ? (
                    <ModeSwitchBtn onClick={modeSwitch}>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>
                        <span>light</span>
                    </ModeSwitchBtn>
                ) : (
                    <ModeSwitchBtn onClick={modeSwitch}>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                            />
                        </svg>
                        <span>Dark</span>
                    </ModeSwitchBtn>
                )}
                <UserInfo>
                    {user?.photoURL ? (
                        <AvatarImg src={user?.photoURL} />
                    ) : (
                        <UserAvatar>
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
                        </UserAvatar>
                    )}
                    <span>{user?.displayName ?? "익명"}</span>
                </UserInfo>
            </MenuList>
            <Outlet />
        </Wrapper>
    );
}

import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr 1.5fr;
    grid-gap: 10px;
    padding: 0 50px;
`;
const MenuList = styled.div`
    padding-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 0px 7px -7px rgba(0, 0, 0, 0.5);
`;
const Menu = styled.div`
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 40px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.pointColor};
        color: white;
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
const Recommendation = styled.div`
    box-shadow: -5px 0px 7px -7px rgba(0, 0, 0, 0.5);
    width: 100%;
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
    return (
        <Wrapper>
            <MenuList>
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
            </MenuList>
            <Outlet />
            <Recommendation />
        </Wrapper>
    );
}

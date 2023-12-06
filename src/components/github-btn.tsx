import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.div`
    margin-top: 50px;
    background-color: ${(props) => props.theme.btnBgD};
    font-weight: 500;
    width: 100%;
    color: ${(props) => props.theme.text};
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
const Logo = styled.img`
    height: 25px;
`;

export default function GithubButton() {
    const navigate = useNavigate();
    const githubLogin = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Button onClick={githubLogin}>
            <Logo src="/github-logo.svg" />
            Github 로그인 하기
        </Button>
    );
}

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Title, Wrapper } from "../components/auth-components";
import styled from "styled-components";

const GoLoginBtn = styled(Link)`
    background-color: ${(props) => props.theme.btnBgNormal};
    margin-top: 10px;
    padding: 12px 20px;
    border-radius: 20px;
    cursor: pointer;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    text-decoration: none;
    color: ${(props) => props.theme.text};
    &:hover {
        background-color: ${(props) => props.theme.btnBgActive};
        color: ${(props) => props.theme.tweetAccent};
    }
`;

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credential.user, { displayName: name });
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <Wrapper>
            <Title>지금 가입하기</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    onChange={onChange}
                    name="name"
                    value={name}
                    placeholder="이름"
                    type="text"
                    required
                />
                <Input
                    onChange={onChange}
                    name="email"
                    value={email}
                    placeholder="이메일"
                    type="email"
                    required
                />
                <Input
                    onChange={onChange}
                    value={password}
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    required
                />
                <Input
                    type="submit"
                    value={isLoading ? "계정 생성중..." : "계정만들기"}
                />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <span style={{ marginTop: 30 }}>이미 계정이 있으신가요?</span>
            <GoLoginBtn to="/login">로그인</GoLoginBtn>
        </Wrapper>
    );
}

import { styled } from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;
export const Title = styled.h1`
    font-size: 42px;
    font-weight: 700;
`;
export const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;
export const Input = styled.input`
    font-family: "Sunflower", sans-serif;
    background-color: ${(props) => props.theme.inputBg};
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 18px;
    &[type="submit"] {
        color: ${(props) => props.theme.text};
        background-color: ${(props) => props.theme.btnBgNormal};
        cursor: pointer;
        &:hover {
            background-color: ${(props) => props.theme.btnBgActive};
            color: ${(props) => props.theme.tweetAccent};
        }
    }
    &:focus {
        outline: none;
    }
`;
export const Error = styled.span`
    margin-top: 15px;
    font-weight: 600;
    color: tomato;
`;
export const Switcher = styled.span`
    margin-top: 20px;
    a {
        color: ${(props) => props.theme.pointColor};
        text-decoration: none;
    }
`;

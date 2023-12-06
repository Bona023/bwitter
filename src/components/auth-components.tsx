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
    background-color: #e5e0ff;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 18px;
    &[type="submit"] {
        color: ${(props) => props.theme.bodyBg};
        background-color: ${(props) => props.theme.text};
        cursor: pointer;
        &:hover {
            background-color: ${(props) => props.theme.btnBg};
        }
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
        color: #1d9bf0;
    }
`;

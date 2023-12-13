import styled from "styled-components";

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Text = styled.span`
    font-size: 32px;
    color: red;
`;

export default function ErrorPage() {
    return (
        <Wrapper>
            <Text>ERROR! : Sorry not found</Text>
        </Wrapper>
    );
}

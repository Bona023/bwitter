import styled from "styled-components";
import PostTweetForm from "../components/tweet-form";

const Wrapper = styled.div`
    padding: 50px 30px;
    display: flex;
    flex-direction: column;
`;

export default function Home() {
    return (
        <Wrapper>
            <PostTweetForm />
        </Wrapper>
    );
}

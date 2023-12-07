import styled from "styled-components";
import PostTweetForm from "../components/tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    padding: 50px 30px;
    display: grid;
    gap: 50px;
    grid-template-rows: 1fr 5fr;
`;

export default function Home() {
    return (
        <Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    );
}

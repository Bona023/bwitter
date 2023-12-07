import styled from "styled-components";
import PostTweetForm from "../components/tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    gap: 40px;
    grid-template-rows: 1fr 5fr;
    overflow-y: scroll;
`;

export default function Home() {
    return (
        <Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    );
}

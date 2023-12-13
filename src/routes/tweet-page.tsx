import { useParams } from "react-router-dom";
import Tweet from "../components/tweet";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ITweet } from "../components/timeline";
import ReplyForm from "../components/reply-form";
import Replies from "../components/replies";

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 5fr;
    overflow-y: scroll;
    background-color: ${(props) => props.theme.tweetBg};
`;

export default function TweetPage() {
    const { docId } = useParams();
    const [tweetProp, setTweetProp] = useState<ITweet>();
    const fetchTweet = async () => {
        if (docId === undefined) return;
        const docRef = doc(db, "tweets", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const { photo, tweet, writer, userId, userAvatar, createdAt } = docSnap.data();
            setTweetProp({ photo, tweet, writer, userId, userAvatar, createdAt, id: docId });
        } else {
            console.log("No such document!");
        }
    };
    useEffect(() => {
        fetchTweet();
    }, []);
    return (
        <Wrapper>
            <Tweet {...tweetProp} />
            <ReplyForm docId={docId} />
            <Replies docId={docId} />
        </Wrapper>
    );
}

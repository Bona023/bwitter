import { useParams } from "react-router-dom";
import Tweet from "../components/tweet";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ITweet } from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    gap: 40px;
    grid-template-rows: 1fr 5fr;
    overflow-y: scroll;
`;
const Replies = styled.div``;

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
            {docId === undefined ? null : (
                <Tweet
                    key={docId}
                    {...tweetProp}
                />
            )}
            <Replies />
        </Wrapper>
    );
}

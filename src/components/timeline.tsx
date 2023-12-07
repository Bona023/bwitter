import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    writer: string;
    userId: string;
    createAt: number;
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
`;

export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([]);
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchTweets = async () => {
            const tweetsQuery = query(collection(db, "tweets"), orderBy("createAt", "desc"), limit(25));
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const posts = snapshot.docs.map((doc) => {
                    const { photo, tweet, writer, userId, createAt } = doc.data();
                    return {
                        photo,
                        tweet,
                        writer,
                        userId,
                        createAt,
                        id: doc.id,
                    };
                });
                setTweet(posts);
            });
        };
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);
    return (
        <Wrapper>
            {tweets.map((tweet) => (
                <Tweet
                    key={tweet.id}
                    {...tweet}
                />
            ))}
        </Wrapper>
    );
}

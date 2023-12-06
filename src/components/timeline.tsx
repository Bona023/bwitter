import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    writer: string;
    userId: string;
    createAt: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([]);
    const fetchTweets = async () => {
        const tweetsQuery = query(collection(db, "tweets"), orderBy("createAt", "desc"));
        const snapShot = await getDocs(tweetsQuery);
        const posts = snapShot.docs.map((doc) => {
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
    };
    useEffect(() => {
        fetchTweets();
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

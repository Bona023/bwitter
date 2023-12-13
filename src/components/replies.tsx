import { useEffect, useState } from "react";
import styled from "styled-components";
import { Unsubscribe } from "firebase/auth";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Reply from "./reply";

export interface IReply {
    createdAt: number;
    reply: string;
    userAvatar?: string;
    userId: string;
    writer: string;
    replyId: string;
    docId: string;
}

const Wrapper = styled.div`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default function Replies({ docId }: any) {
    const [replies, setReplies] = useState<IReply[]>([]);
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchTweets = async () => {
            const tweetsQuery = query(collection(db, `tweets/${docId}/replies`), orderBy("createdAt", "desc"), limit(30));
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const post = snapshot.docs.map((doc) => {
                    const { reply, writer, userId, createdAt, userAvatar } = doc.data();
                    return {
                        reply,
                        writer,
                        userId,
                        userAvatar,
                        createdAt,
                        replyId: doc.id,
                        docId: docId,
                    };
                });
                setReplies(post);
            });
        };
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);
    return (
        <Wrapper>
            {replies.map((reply) => (
                <Reply
                    key={reply.replyId}
                    {...reply}
                />
            ))}
        </Wrapper>
    );
}

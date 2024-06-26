import { Button } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from "react-firebase-hooks/auth";
//import firebase from 'firebase';
import { AnalyticsBrowser } from "@segment/analytics-next";

function ChatInput({ channelName, channelId, chatRef }) {
    const analytics = AnalyticsBrowser.load({ writeKey: 'TD0oABfXUMo4C1p01WUgvXL3atnHCaWR' });
    const [input, setInput] = useState("");

    const [user] = useAuthState(auth);

    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL
        })

        chatRef.current.scrollIntoView({
            behavior: "smooth",
        });

        analytics.track('Message Sent', {
            user: user.displayName,
            channelName: channelName
        });

        setInput('');
    };

    return (
        <ChatInputContainer>
            <form>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName}`}
                />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    );
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;


    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`;

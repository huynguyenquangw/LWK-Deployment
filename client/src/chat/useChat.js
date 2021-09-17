import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:3000";

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
                datetime: `${new Date().toDateString().substr(4, 6)}, ${new Date().toTimeString().substr(0, 5)}`
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };

    return { messages, sendMessage };
};

export default useChat;
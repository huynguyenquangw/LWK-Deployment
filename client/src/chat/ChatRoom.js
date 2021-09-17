import React, { useEffect, useRef } from "react";

import useChat from "./useChat";
import './ChatRoom.css'
import { useState } from "react/cjs/react.development";

const ChatRoom = ({ doctors, isWho, currentPatient, roomId, setRoomId, pop, setPop }) => {
    // const { roomId } = props.match.params;
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = useState("");
    const [currentDoctor, setCurrentDoctor] = useState([])
    const [open, setOpen] = useState(false)
    const [oldMessageLength, setOldMessageLength] = useState(0)
    const messageRef = useRef()

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };

    const handleKeyUp = e => {
        e.preventDefault()
        if (e.key === "Enter") {
            if (newMessage !== "") {
                sendMessage(newMessage)
                setNewMessage("")
            }
        }
    }

    const isGotNewMessages = (array) => {
        if (oldMessageLength < array.length) return true
        else return false
    }

    useEffect(() => {
        doctors.forEach(data => {
            if (data._id == roomId) setCurrentDoctor(data)
        })
    }, [roomId, doctors])

    useEffect(() => {
        while (messages.length) {
            messages.pop()
            setPop(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId, pop])

    useEffect(() => {
        setOldMessageLength(messages.length)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }))

    return (
        <div className={open ? "chat-room-container" : "chat-room-container active"}>
            <div className="chat-header">
                <div className="logo">
                    {isWho === 'isDoctor' ? (
                        <>
                            Chat with patient
                        </>
                    ) : (
                        <>
                            Chat with {currentDoctor.name}
                        </>
                    )}
                </div>

                {!open && isGotNewMessages(messages) &&
                    <div className="notifi">
                        {messages.length - oldMessageLength}
                    </div>}

                <div className="btn-toggle">
                    {open
                        ? <button onClick={() => setOpen(false)}>
                            -
                        </button>
                        : <button onClick={() => setOpen(true)}>
                            +
                        </button>
                    }
                    <button onClick={() => setRoomId(false)}>
                        x
                    </button>
                </div>

            </div>
            <div className="messages-container">
                <div className="wrapper">
                    <div className="chat-content">
                        <div className="message">
                            {messages.map((message, i) => (
                                <div key={i} className={`message-row ${message.ownedByCurrentUser ? "my-message" : "other-message"}`}>
                                    <div className="message-title">
                                        {message.ownedByCurrentUser ? (
                                            <>
                                                {isWho === 'isPatient' ? currentPatient.name : currentDoctor.name}
                                            </>
                                        ) : (
                                            <>
                                                {isWho !== 'isPatient' ? 'Patient' : currentDoctor.name}
                                            </>
                                        )}
                                        {/* {message.ownedByCurrentUser ? currentPatient.name : currentDoctor.name} */}
                                    </div>

                                    <div className="message-text">
                                        {message.body}
                                    </div>

                                    <div className="message-datetime">
                                        {message.datetime}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div ref={messageRef}></div>
                    </div>
                </div>

            </div>
            <div className="input-container">
                <textarea
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write message..."
                    className="new-message-input-field"
                    onKeyUp={handleKeyUp}
                />
                <button disabled={!newMessage} onClick={handleSendMessage} className="send-message-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
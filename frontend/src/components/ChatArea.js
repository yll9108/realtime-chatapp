import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChatAreaContainer = styled.div`
    width: 70%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ChatHeader = styled.header`
    padding: 15px;
    background-color: #e5e5e5;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
`;

const ChatTitle = styled.h3`
    margin: 0;
`;

const ChatMessages = styled.div`
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column; // This will ensure messages stack vertically
`;

const Message = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    max-width: 60%;  // This will ensure that messages don't stretch full width

    &.sent {
        background-color: #d1f1ff;
        align-self: flex-end;
    }
    
    &.received {
        background-color: #eaeaea;
        align-self: flex-start;
    }
`;


const ChatFooter = styled.footer`
    padding: 10px;
    background-color: #e5e5e5;
    border-top: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
`;

const ChatInput = styled.input`
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin: 0 10px;
`;

const ChatButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin: 0 5px;
`;

const LogoutButton = styled.button`
    background-color: #ff5a5a;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    margin-left: auto;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e54848;
    }
`;
const ChatArea = ({ messages, chatName }) => {
    const [currentMessages, setCurrentMessages] = useState(messages);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setCurrentMessages([...currentMessages, { type: "sent", content: inputValue }]);
            setInputValue('');
        }
    };

    useEffect(() => {
        setCurrentMessages(messages); // Update messages whenever `messages` prop changes.
    }, [messages]);

    return (
        <ChatAreaContainer>
            <ChatHeader>
            <ChatTitle>{chatName}</ChatTitle>
                            <LogoutButton onClick={() => {
                    console.log("User Logged Out!");
                }}>
                    Logout
                </LogoutButton>
            </ChatHeader>
            <ChatMessages>
                {messages.map((message, index) => (
                    <Message key={index} className={message.type}>
                        {message.content}
                    </Message>
                ))}
            </ChatMessages>
            <ChatFooter>
            <ChatButton>
                📎  {/* You can replace this with an icon for attachment */}
            </ChatButton>
            <ChatButton>
                😃  {/* Emoji icon */}
            </ChatButton>
            <ChatInput 
                    type="text" 
                    placeholder="Type your message..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
             <ChatButton onClick={handleSendMessage}>
                    ➤  {/* Send button icon */}
                </ChatButton>
        </ChatFooter>
        </ChatAreaContainer>
    );
};


export default ChatArea;

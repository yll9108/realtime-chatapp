
import React, { useState, useEffect, useRef } from 'react';
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
    position: relative; // Added this
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
const EmojiPicker = styled.div`
    position: absolute;
    bottom: 60px;  // This will place it above the ChatFooter
    left: 0;      
    right: 0;     // Ensure it stretches across the entire width of ChatFooter
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;  // This will make it span the entire width of ChatFooter
    padding: 10px; // Add some padding inside
    box-sizing: border-box;
`;

const Emoji = styled.span`
    cursor: pointer;
    padding: 5px;
`;
const AttachModal = styled.div`
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 150px;
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    z-index: 1;
`;

const AttachOption = styled.div`
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background-color: #eaeaea;
    }
`;
const ChatArea = ({ messages, chatName }) => {
    const [currentMessages, setCurrentMessages] = useState(messages);
    const [inputValue, setInputValue] = useState('');
    const fileInputRef = useRef(null);
    const [showAttachModal, setShowAttachModal] = useState(false);

    const handleAttachOptionClick = (type) => {
        switch (type) {
            case 'image':
                fileInputRef.current.setAttribute('accept', 'image/*');
                break;
            case 'video':
                fileInputRef.current.setAttribute('accept', 'video/*');
                break;
            case 'audio':
                fileInputRef.current.setAttribute('accept', 'audio/*');
                break;
            default:
                fileInputRef.current.removeAttribute('accept');
                break;
        }
        fileInputRef.current.click();
        setShowAttachModal(false);
    };
    
    useEffect(() => {
        setCurrentMessages(messages); // Update messages whenever `messages` prop changes.
    }, [messages]);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const emojis = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋"]; // Add more emojis if you like

    const handleInsertEmoji = (emoji) => {
        setInputValue(inputValue + emoji);
        setShowEmojiPicker(false);  // Hide the picker once an emoji is selected
    };
    
    const handleSendMessage = () => {
        console.log("Trying to send message...");
        if (inputValue.trim()) {
            const message = { type: "sent", content: inputValue };
            setCurrentMessages(prevMessages => [...prevMessages, message]);
            setInputValue('');
        }
    };
    
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
    {currentMessages.map((message, index) => (
        <Message key={index} className={message.type}>
            {message.content}
        </Message>
    ))}
</ChatMessages>

            <ChatFooter>
            <ChatButton onClick={() => setShowAttachModal(!showAttachModal)}>
    📎
</ChatButton>{showAttachModal && (
    <AttachModal>
        <AttachOption onClick={() => handleAttachOptionClick('image')}>
            🖼 Image
        </AttachOption>
        <AttachOption onClick={() => handleAttachOptionClick('video')}>
            🎥 Video
        </AttachOption>
        <AttachOption onClick={() => handleAttachOptionClick('audio')}>
            🎵 Audio
        </AttachOption>
        <AttachOption onClick={() => handleAttachOptionClick('file')}>
            📁 File
        </AttachOption>
    </AttachModal>
)}
                <ChatButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    😃
                </ChatButton>
                {showEmojiPicker && (
                    <EmojiPicker>
                        {emojis.map((emoji, index) => (
                            <Emoji key={index} onClick={() => handleInsertEmoji(emoji)}>
                                {emoji}
                            </Emoji>
                        ))}
                    </EmojiPicker>
                )}
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
                    ➤
                </ChatButton>
                <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    ref={fileInputRef} 
                    onChange={(e) => {
                        const file = e.target.files[0];
                        console.log(file);
                    }}
                />
            </ChatFooter>
        </ChatAreaContainer>
    );
};


export default ChatArea;


// ChatItem.js
import React from 'react';
import styled from 'styled-components';

const ChatItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;

    &:hover {
        background-color: #e8e8e8;
    }
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: purple;
    margin-right: 15px;
`;

const ChatInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChatName = styled.h4`
    margin: 0;
    font-weight: 500;
`;

const ChatDate = styled.p`
    margin: 0;
    color: #888;
`;

const LastMessage = styled.p`
    margin: 0;
    color: #aaa;
`;

const ChatItem = ({ chat, onClick }) => {
    return (
        <ChatItemContainer onClick={onClick}>
            <Avatar />
            <ChatInfo>
                <ChatName>{chat.name}</ChatName>
                <ChatDate>{chat.date}</ChatDate>
                <LastMessage>{chat.lastMessage}</LastMessage>
            </ChatInfo>
        </ChatItemContainer>
    );
};


export default ChatItem;

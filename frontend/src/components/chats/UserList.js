// UserList.js

import React from 'react';
import styled from 'styled-components';

const UserListContainer = styled.div`
    width: 30%;
    height: 100vh;
    background-color: #f0f0f0;
    border-right: 1px solid #e0e0e0;
    overflow-y: auto;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
`;

const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: purple;
    margin-right: 15px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.h4`
    margin: 0;
    font-weight: 500;
`;

const UserLastMessage = styled.p`
    margin: 0;
    color: #888;
`;

const UserDate = styled.p`
    margin: 0;
    color: #aaa;
    font-size: 12px;
`;

const UserList = ({ setSelectedChat, chats }) => {
    return (
        <UserListContainer>
            {Object.keys(chats).map(name => (
                <User key={name} onClick={() => setSelectedChat(name)}>
                    <UserAvatar />
                    <UserInfo>
                        <UserName>{name}</UserName>
                        <UserLastMessage>{chats[name].lastMessage}</UserLastMessage>
                        <UserDate>{chats[name].date}</UserDate>
                    </UserInfo>
                </User>
            ))}
        </UserListContainer>
    );
};


export default UserList;

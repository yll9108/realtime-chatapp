import React from 'react';
import ChatArea from './ChatArea'; // Make sure the path is correct
import UserList from './UserList'; // Make sure the path is correct
import styled from 'styled-components';

const ChatContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;  // Assuming you want it to take the full viewport height
`;

function Chat({ handleLogout }) {
    return (
        <ChatContainer>
            <UserList />
            <ChatArea />
            <button onClick={handleLogout}>Logout</button>
        </ChatContainer>
    );
}

export default Chat;

import React from 'react';
import styled from 'styled-components';

const ChatAreaContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
`;

const ChatHeader = styled.header`
    padding: 15px;
    background-color: #f0f0f0;
`;

const ChatMessages = styled.div`
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
`;

const Message = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;

    &.sent {
        align-self: flex-end;
        background-color: #d1f1ff;
    }
    &.received {
        align-self: flex-start;
        background-color: #eaeaea;
    }
`;

const ChatFooter = styled.footer`
    padding: 15px;
    background-color: #f0f0f0;
`;

const ChatArea = () => {
    return (
        <ChatAreaContainer>
            <ChatHeader>
                <h3>John</h3>
            </ChatHeader>
            <ChatMessages>
                <Message className="sent">Hello how are you</Message>
                <Message className="received">I'm good, thanks.</Message>
            </ChatMessages>
            <ChatFooter>
                <input type="text" placeholder="Type your message..."/>
            </ChatFooter>
        </ChatAreaContainer>
    );
};

export default ChatArea;

// ChatList.js
import React from 'react';
import ChatItem from './ChatItem';

function ChatList({ setSelectedChat, chats }) {
    const chatNames = Object.keys(chats);

    return (
        <div className="chat-list">
            {chatNames.map(name => (
                <ChatItem
                    key={name}
                    chat={{name: name, ...chats[name][chats[name].length - 1]}}
                    onClick={() => setSelectedChat(name)}
                />
            ))}
        </div>
    );
}


export default ChatList;
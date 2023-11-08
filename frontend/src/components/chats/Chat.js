import React, { useState } from "react";
import ChatArea from "./ChatArea";
import UserList from "./UserList";
import Sidebar from "../shared/Sidebar.js";
import Friends from "../settings/Friends.js";
import Settings from "../settings/Settings.js";
import Profile from "../settings/Profile.js";
import styled from "styled-components";

const ChatContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

function Chat({ handleLogout }) {
    const demoChats = {
        John: {
            messages: [
                { type: "sent", content: "Hello how are you" },
                { type: "received", content: "I'm good, thanks." },
            ],
            lastMessage: "I'm good, thanks.",
            date: "2023-10-04",
        },
        Doe: {
            messages: [{ type: "sent", content: "Hey!" }],
            lastMessage: "Hey!",
            date: "2023-10-05",
        },
    };

    const [selectedChat, setSelectedChat] = useState("John"); // default to John
    const [activeSection, setActiveSection] = useState("chat"); // default to chat

    return (
        <ChatContainer>
            <Sidebar
                setActiveSection={setActiveSection}
                handleLogout={handleLogout}
            />

            {activeSection === "chat" && (
                <>
                    <UserList
                        setSelectedChat={setSelectedChat}
                        chats={demoChats}
                    />
                    <ChatArea
                        chat={selectedChat}
                        messages={demoChats[selectedChat].messages}
                        chatName={selectedChat}
                        onLogout={handleLogout}
                    />
                </>
            )}
            {activeSection === "friends" && <Friends friendsData={demoChats} />}
            {activeSection === "settings" && <Settings />}
            {activeSection === "profile" && <Profile />}
        </ChatContainer>
    );
}

export default Chat;

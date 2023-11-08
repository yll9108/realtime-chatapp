// import React, { useState } from "react";
import ChatArea from "../chats/ChatArea";
import UserList from "../chats/UserList";
import Sidebar from "../shared/Sidebar";
import { useContext } from "react";
import styled from "styled-components";
// import Friends from "../settings/Friends";
// import Settings from './Settings';
// import Profile from './Profile';
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import PotentialChats from "../chats/PotentialChats";

const ChatContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

function Chat() {
    // const demoChats = {
    //     'John': {
    //         messages: [
    //             { type: "sent", content: "Hello how are you" },
    //             { type: "received", content: "I'm good, thanks." }
    //         ],
    //         lastMessage: "I'm good, thanks.",
    //         date: "2023-10-04"
    //     },
    //     'Doe': {
    //         messages: [
    //             { type: "sent", content: "Hey!" }
    //         ],
    //         lastMessage: "Hey!",
    //         date: "2023-10-05"
    //     }
    // };

    // const [selectedChat, setSelectedChat] = useState('John'); // default to John
    // const [activeSection, setActiveSection] = useState("chat"); // default to chat
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading } = useContext(ChatContext);

    return (
        <ChatContainer>
            <Sidebar />
            <PotentialChats />
            {userChats?.length < 1 ? null : (
                <Stack className="chat-list">
                    <Stack className="messages-box">
                        {isUserChatsLoading && <p>Loading Chats..</p>}
                        {userChats?.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <UserList chat={chat} user={user} />
                                </div>
                            );
                        })}
                    </Stack>
                    <ChatArea />
                </Stack>
            )}
        </ChatContainer>

        // <ChatContainer>
        //  <Sidebar setActiveSection={setActiveSection} handleLogout={handleLogout} />

        //     {activeSection === 'chat' && (
        //         <>
        //             <UserList setSelectedChat={setSelectedChat} chats={demoChats} />
        //             <ChatArea chat={selectedChat} messages={demoChats[selectedChat].messages} chatName={selectedChat} onLogout={handleLogout} />
        //         </>
        //     )}
        //     {activeSection === 'friends' && <Friends friendsData={demoChats} />}
        //     {activeSection === 'settings' && <Settings />}
        //     {activeSection === 'profile' && <Profile />}
        // </ChatContainer>
    );
}
const Stack = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4em;
`;
export default Chat;

import React, { useContext, useState } from "react";
import ChatArea from "../chats/ChatArea";
import UserList from "../chats/UserList";
import Sidebar from "../shared/Sidebar";
import styled from "styled-components";
import Friends from "../settings/Friends";
import Settings from '../settings/Settings';
import Profile from '../settings/Profile';
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import PotentialChats from "../chats/PotentialChats";

function Chat() {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
    const [activeSection, setActiveSection] = useState('chat');
  return (
    <ChatContainer>
      <Sidebar setActiveSection={setActiveSection} />
      {activeSection === 'friends' && <PotentialChats />}
      {activeSection === 'settings' && <Settings />}
      {activeSection === 'profile' && <Profile userProfile={user} />} 
      {activeSection === 'chat' && userChats?.length > 0 && (
        <ChatList>
          <Stack className="messages-box">
            {isUserChatsLoading && <p>Loading Chats..</p>}
            {userChats?.map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserList chat={chat} user={user} />
              </div>
            ))}
          </Stack>
          <ChatArea />
        </ChatList>
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
const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4em;
`;
const ChatList = styled.div`
  display: flex;
  align-items: start;
  gap: 4em;
`;
export default Chat;


import React, { useContext } from "react";
import ChatArea from "../chats/ChatArea";
import UserList from "../chats/UserList";
import Sidebar from "../shared/Sidebar";
import styled from "styled-components";
// import Friends from "../settings/Friends";
// import Settings from './Settings';
// import Profile from './Profile';
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import PotentialChats from "../chats/PotentialChats";

function Chat() {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <ChatContainer>

      <Sidebar setActiveSection={setActiveSection} />
      {activeSection === 'friends' && <PotentialChats />}
      {activeSection === 'settings' && <Settings />}
      {activeSection === 'profile' && <Profile userProfile={user} />} 
      {activeSection === 'chat' && userChats?.length > 0 && (

      <PotentialChats />
      {userChats?.length < 1 ? null : (

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

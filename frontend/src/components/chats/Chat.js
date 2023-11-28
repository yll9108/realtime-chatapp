import React, { useState, useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import ChatArea from "../chats/ChatArea";
import UserList from "../chats/UserList";
import Sidebar from "../shared/Sidebar";
// import Friends from "../settings/Friends";
import Settings from "../settings/Settings";
import Profile from "../settings/Profile";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import PotentialChats from "../chats/PotentialChats";
function Chat() {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  const [activeSection, setActiveSection] = useState("chat");
  return (
    <Container className="d-flex">
      <Sidebar setActiveSection={setActiveSection} />
      {activeSection === "friends" && <PotentialChats />}
      {activeSection === "settings" && <Settings />}
      {activeSection === "profile" && <Profile userProfile={user} />}
      {activeSection === "chat" && userChats?.length > 0 && (
        <Container>
          {userChats?.length < 1 ? null : (
            <Stack direction="horizontal" gap={4} className="align-items-start">
              <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                {isUserChatsLoading && <p>Loading Chats..</p>}
                {userChats?.map((chat, index) => {
                  return (
                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                      <UserList chat={chat} user={user} />
                    </div>
                  );
                })}
              </Stack>
              <ChatArea />
            </Stack>
          )}
        </Container>
      )}
    </Container>
  );
}
export default Chat;

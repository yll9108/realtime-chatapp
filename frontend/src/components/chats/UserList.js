// UserList.js

import React, { useContext } from "react";
import styled from "styled-components";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/ChatContext";

const UserListContainer = styled.div`
  background-color: #f0f0f0;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  display: flex;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: purple; 
  margin-right: 15px;
  background-image: url(${props => props.src}); 
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
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

const UserNotification = styled.p`
  margin: 0;
  color: #aaa;
  font-size: 12px;
`;
const Stack = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3em;
`;

const UserList = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );
  const profilePictureUrl = recipientUser && recipientUser.profilePicture
  ? `http://localhost:8080/${recipientUser.profilePicture}` 
  : ''; 
  console.log('Profile Picture URL:', profilePictureUrl);
  return (
    <UserListContainer>
      <Stack>
        <div>
        {profilePictureUrl ? (
    <UserAvatar src={profilePictureUrl} />
  ) : (
    <UserAvatar /> // Default avatar when no picture URL is available
  )}
                  <UserInfo>
          <UserName>
  {recipientUser && recipientUser.userName ? recipientUser.userName : "unknown"}
</UserName>

            <UserLastMessage>text message</UserLastMessage>
          </UserInfo>
        </div>
        <div>
          <UserDate>05/11/2023</UserDate>
          <UserNotification>2</UserNotification>
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
      </Stack>
    </UserListContainer>

  );
};

export default UserList;

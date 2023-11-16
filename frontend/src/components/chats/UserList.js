// UserList.js

import React from "react";
import styled from "styled-components";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserListContainer = styled.div`
  background-color: #f0f0f0;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  display: flex;
`;

// const User = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   border-bottom: 1px solid #e0e0e0;
//   cursor: pointer;
// `;

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
const UserOnlie = styled.span`
  background-color: green;
  border-radius: 50%;
`;
const UserList = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  // console.log(recipientUser);
  return (
    <UserListContainer>
      <Stack>
        <div>
          <UserAvatar />
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
          <UserOnlie>online</UserOnlie>
        </div>
      </Stack>
    </UserListContainer>
    // <UserListContainer>
    //     {Object.keys(chats).map(name => (
    //         <User key={name} onClick={() => setSelectedChat(name)}>
    //             <UserAvatar />
    //             <UserInfo>
    //                 <UserName>{name}</UserName>
    //                 <UserLastMessage>{chats[name].lastMessage}</UserLastMessage>
    //                 <UserDate>{chats[name].date}</UserDate>
    //             </UserInfo>
    //         </User>
    //     ))}
    // </UserListContainer>
  );
};

export default UserList;

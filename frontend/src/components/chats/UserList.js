// UserList.js
import Stack from "react-bootstrap";
import React, { useContext } from "react";
import styled from "styled-components";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

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
  background-image: url(${(props) => props.src});
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

const UserList = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const { lastestMessage } = useFetchLatestMessage(chat);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );
  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );
  const profilePictureUrl =
    recipientUser && recipientUser.profilePicture
      ? `http://localhost:8080/${recipientUser.profilePicture}`
      : "";
  console.log("Profile Picture URL:", profilePictureUrl);

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };
  return (
    <UserListContainer>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
        onClick={() => {
          if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationsAsRead(
              thisUserNotifications,
              notifications
            );
          }
        }}
      >
        <div>
          {profilePictureUrl ? (
            <UserAvatar src={profilePictureUrl} />
          ) : (
            <UserAvatar /> // Default avatar when no picture URL is available
          )}
          <UserInfo>
            <UserName>
              {recipientUser && recipientUser.userName
                ? recipientUser.userName
                : "unknown"}
            </UserName>

            <UserLastMessage>
              {lastestMessage?.text && (
                <span>{truncateText(lastestMessage?.text)}</span>
              )}
            </UserLastMessage>
          </UserInfo>
        </div>
        <div>
          <UserDate>{moment(lastestMessage?.sentAt).calendar()}</UserDate>
          <UserNotification
            className={
              thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
            }
          >
            {thisUserNotifications?.length > 0
              ? thisUserNotifications?.length
              : ""}
          </UserNotification>
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
      </Stack>
    </UserListContainer>
  );
};

export default UserList;

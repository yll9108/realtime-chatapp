import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

import styled from "styled-components";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers, userChats } =
        useContext(ChatContext);
    const [query, setQuery] = useState("");
    const filteredChats = potentialChats.filter((u) =>
        u.userName.toLowerCase().includes(query.toLowerCase())
    );
    const isFriendInChatList = (friendId) => {
        return userChats.some((chat) => chat.roomMembers.includes(friendId));
    };
    return (
        <>
            <div className="all-users d-flex">
                <div className="all-users-search flex-row">
                    <h1 className="all-users-title">Friends</h1>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="search"
                        placeholder="Search Friends"
                    />
                </div>
                {filteredChats.map((u, index) => {
                    const profilePictureUrl = u.profilePicture
                        ? `https://realtime-chatapp-backend-nc9x.onrender.com/${u.profilePicture}`
                        : "";
                    return (
                        <div className="single-user" key={index}>
                            <div className="me-2 single-user-componenet">
                                <div className="friend-avatar">
                                    {u.showProfile === true ? (
                                        <UserAvatar src={profilePictureUrl} />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            fill="currentColor"
                                            className="user-svg bi bi-person-circle"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path
                                                fillRule="evenodd"
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div className="friend-name">
                                    <span>{u.userName}</span>
                                </div>
                            </div>

                            <span
                                className={
                                    onlineUsers?.some(
                                        (user) => user?.userId === u?._id
                                    ) && u.showStatus === true
                                        ? "friend-online"
                                        : ""
                                }
                            ></span>

                            <div className="single-user-componenet">
                                <div className="friend-about">
                                    {u.showAbout === true ? (
                                        <span>{u.about}</span>
                                    ) : null}
                                </div>
                                {!isFriendInChatList(u._id) && (
                                    <button
                                        className="friend-addChat"
                                        onClick={() =>
                                            createChat(user?._id, u._id)
                                        }
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
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
export default PotentialChats;

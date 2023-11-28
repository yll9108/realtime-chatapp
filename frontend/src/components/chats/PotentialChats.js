import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { Button, Stack } from "react-bootstrap";

const AllUsers = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100vh;
`;

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  // console.log("potentialChats", potentialChats);
  return (
    <>
      <AllUsers>
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{u.userName}</span>
                <Button onClick={() => createChat(user?._id, u._id)}>+</Button>
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </AllUsers>
    </>
  );
};

export default PotentialChats;

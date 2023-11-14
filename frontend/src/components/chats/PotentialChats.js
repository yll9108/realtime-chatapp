import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

const AllUsers = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100vh;
`; 

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
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
                onClick={() => createChat(user?._id, u._id)}
              >
                {u.userName}
                <span className="user-online"></span>
              </div>
            );
          })}
      </AllUsers>
    </>
  );
};

export default PotentialChats;

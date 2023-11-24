import { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatArea = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessageLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser) return <p>No conversation selected</p>;
  if (isMessageLoading) return <p>Loading Chat</p>;

  return (
    <ChatAreaContainer>
      <div className="chat-header">
        <strong>{recipientUser?.userName}</strong>
      </div>
      <Stack className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
              ref={scroll}
            >
              <span>{message.content}</span>
              <span className="message-footer">
                {moment(message.sentAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack className="chat-input">
        <InputEmoji value={textMessage} onChange={setTextMessage} />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </Stack>
    </ChatAreaContainer>
  );
};
const ChatAreaContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4em;
`;

export default ChatArea;

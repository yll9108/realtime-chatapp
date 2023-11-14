import { useContext, useState } from "react";
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
            <Stack key={index}>
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

// const LogoutModal = ({ onCancel, onConfirm }) => {
//   return (
//     <LogoutModalContainer>
//       <ModalContent>
//         <p>Are you sure you want to logout?</p>
//         <ModalButton onClick={onCancel}>Cancel</ModalButton>
//         <ModalButton onClick={onConfirm}>Logout</ModalButton>
//       </ModalContent>
//     </LogoutModalContainer>
//   );
// };

//const ChatArea = ({ messages, chatName, onLogout }) => {
// const [currentMessages, setCurrentMessages] = useState(messages);
// const [inputValue, setInputValue] = useState('');
// const fileInputRef = useRef(null);
// const [showAttachModal, setShowAttachModal] = useState(false);

// const handleAttachOptionClick = (type) => {
//     switch (type) {
//         case 'image':
//             fileInputRef.current.setAttribute('accept', 'image/*');
//             break;
//         case 'video':
//             fileInputRef.current.setAttribute('accept', 'video/*');
//             break;
//         case 'audio':
//             fileInputRef.current.setAttribute('accept', 'audio/*');
//             break;
//         default:
//             fileInputRef.current.removeAttribute('accept');
//             break;
//     }
//     fileInputRef.current.click();
//     setShowAttachModal(false);
// };

// useEffect(() => {
//     setCurrentMessages(messages); // Update messages whenever `messages` prop changes.
// }, [messages]);

// const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// const [showLogoutModal, setShowLogoutModal] = useState(false);

// const emojis = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋"]; // Add more emojis if you like

// const handleInsertEmoji = (emoji) => {
//     setInputValue(inputValue + emoji);
//     setShowEmojiPicker(false);  // Hide the picker once an emoji is selected
// };

// const handleSendMessage = () => {
//     console.log("Trying to send message...");
//     if (inputValue.trim()) {
//         const message = { type: "sent", content: inputValue };
//         setCurrentMessages(prevMessages => [...prevMessages, message]);
//         setInputValue('');
//     }
// };
// const handleConfirmLogout = () => {
//     if (typeof onLogout === 'function') {
//         console.log("User Logged Out!");
//         onLogout();
//         setShowLogoutModal(false);
//     } else {
//         console.error("onLogout is not a function");
//     }
// };

// const handleCancelLogout = () => {
//     setShowLogoutModal(false);
// };

// const handleLogout = () => {
//     setShowLogoutModal(true);
// };

//return (

//         <ChatAreaContainer>
//             <ChatHeader>
//                 <ChatTitle>{chatName}</ChatTitle>
//                 <LogoutButton onClick={handleLogout}>
//                     Logout
//                 </LogoutButton>
//                 {showLogoutModal && (
//                 <LogoutModal
//                     onCancel={handleCancelLogout}
//                     onConfirm={handleConfirmLogout}
//                 />
//             )}

//             </ChatHeader>
//             <ChatMessages>
//     {currentMessages.map((message, index) => (
//         <Message key={index} className={message.type}>
//             {message.content}
//         </Message>
//     ))}
// </ChatMessages>

//             <ChatFooter>
//             <ChatButton onClick={() => setShowAttachModal(!showAttachModal)}>
//     📎
// </ChatButton>{showAttachModal && (
//     <AttachModal>
//         <AttachOption onClick={() => handleAttachOptionClick('image')}>
//             🖼 Image
//         </AttachOption>
//         <AttachOption onClick={() => handleAttachOptionClick('video')}>
//             🎥 Video
//         </AttachOption>
//         <AttachOption onClick={() => handleAttachOptionClick('audio')}>
//             🎵 Audio
//         </AttachOption>
//         <AttachOption onClick={() => handleAttachOptionClick('file')}>
//             📁 File
//         </AttachOption>
//     </AttachModal>
// )}
//                 <ChatButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//                     😃
//                 </ChatButton>
//                 {showEmojiPicker && (
//                     <EmojiPicker>
//                         {emojis.map((emoji, index) => (
//                             <Emoji key={index} onClick={() => handleInsertEmoji(emoji)}>
//                                 {emoji}
//                             </Emoji>
//                         ))}
//                     </EmojiPicker>
//                 )}
//                 <ChatInput
//                     type="text"
//                     placeholder="Type your message..."
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyPress={(e) => {
//                         if (e.key === 'Enter') {
//                             handleSendMessage();
//                         }
//                     }}
//                 />
//                 <ChatButton onClick={handleSendMessage}>
//                     ➤
//                 </ChatButton>
//                 <input
//                     type="file"
//                     style={{ display: 'none' }}
//                     ref={fileInputRef}
//                     onChange={(e) => {
//                         const file = e.target.files[0];
//                         console.log(file);
//                     }}
//                 />
//             </ChatFooter>
//         </ChatAreaContainer>
//   );
// };
// const ChatHeader = styled.header`
//   padding: 15px;
//   background-color: #e5e5e5;
//   border-bottom: 1px solid #d0d0d0;
//   display: flex;
//   align-items: center;
// `;

// const ChatTitle = styled.h3`
//   margin: 0;
// `;

// const ChatMessages = styled.div`
//   flex-grow: 1;
//   padding: 20px;
//   overflow-y: auto;
//   background-color: #f8f8f8;
//   display: flex;
//   flex-direction: column; // This will ensure messages stack vertically
// `;

// const Message = styled.div`
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 10px;
//   max-width: 60%; // This will ensure that messages don't stretch full width

//   &.sent {
//     background-color: #d1f1ff;
//     align-self: flex-end;
//   }

//   &.received {
//     background-color: #eaeaea;
//     align-self: flex-start;
//   }
// `;

// const ChatFooter = styled.footer`
//   position: relative; // Added this
//   padding: 10px;
//   background-color: #e5e5e5;
//   border-top: 1px solid #d0d0d0;
//   display: flex;
//   align-items: center;
// `;

// const ChatInput = styled.input`
//   flex-grow: 1;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 20px;
//   margin: 0 10px;
// `;

// const ChatButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 20px;
//   margin: 0 5px;
// `;

// const LogoutButton = styled.button`
//   background-color: #ff5a5a;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   font-weight: bold;
//   cursor: pointer;
//   margin-left: auto;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #e54848;
//   }
// `;
// const EmojiPicker = styled.div`
//   position: absolute;
//   bottom: 60px; // This will place it above the ChatFooter
//   left: 0;
//   right: 0; // Ensure it stretches across the entire width of ChatFooter
//   background-color: #f8f8f8;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%; // This will make it span the entire width of ChatFooter
//   padding: 10px; // Add some padding inside
//   box-sizing: border-box;
// `;

// const Emoji = styled.span`
//   cursor: pointer;
//   padding: 5px;
// `;
// const AttachModal = styled.div`
//   position: absolute;
//   bottom: 60px;
//   left: 0;
//   width: 150px;
//   background-color: #f8f8f8;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
//   z-index: 1;
// `;

// const AttachOption = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 5px;

//   &:hover {
//     background-color: #eaeaea;
//   }
// `;
// const LogoutModalContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 9999;
// `;

// const ModalContent = styled.div`
//   background: #fff;
//   padding: 20px;
//   border-radius: 8px;
//   width: 300px;
//   text-align: center;
// `;

// const ModalButton = styled.button`
//   padding: 8px 15px;
//   border: none;
//   border-radius: 5px;
//   margin: 5px;
//   cursor: pointer;
// `;
export default ChatArea;

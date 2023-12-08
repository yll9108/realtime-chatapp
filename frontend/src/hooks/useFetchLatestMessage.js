import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(
                `${baseUrl}/messages/${chat?._id}`
            );

            if (response.error) {
                return console.log(
                    "useFetchLatestMessage Error - ",
                    response.error
                );
            }

            const lastMessage = response[response?.length - 1];
            // if (lastMessage) {
            //     const { messageType, fileName } = lastMessage;
            //     if (messageType === "image") {
            // console.log("fileName", fileName);
            setLatestMessage(lastMessage);
            // } else if (messageType === "text") {
            //     setLatestMessage(lastMessage);
            // }
            // }
        };
        getMessages();
    }, [newMessage, notifications]);

    return { latestMessage };
};

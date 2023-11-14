

import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.roomMembers?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;

      try {
        const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

        if (response.data) {
          setRecipientUser(response.data);
        } else {
          setError('The response did not contain user data.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getUser();
  }, [chat, user, recipientId]); 

  return { recipientUser, error }; 
};
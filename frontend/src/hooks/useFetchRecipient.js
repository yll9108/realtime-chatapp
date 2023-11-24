import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.roomMembers?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) {
        console.log('No recipient ID found');
        return null;
      }

      try {
        const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
        setRecipientUser(response);
        console.log('Fetched user data:', response);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error);
      }
    };

    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};

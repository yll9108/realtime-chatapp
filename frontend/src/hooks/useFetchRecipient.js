import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.roomMembers?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) {
        setError('No recipientId found.');
        return;
      }

      try {
        const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
     

        // If the data is directly on the response object, use it
        if (response?._id) {
          setRecipientUser(response);
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

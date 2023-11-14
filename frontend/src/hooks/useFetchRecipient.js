import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.roomMembers?.find((id) => id !== user?._id);

  // eslint-disable-next-line
  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      if (response.error) {
        response.error = error;
        return setError(error);
      }

      setRecipientUser(response);
    };

    getUser();
  }, [recipientId]);
  return { recipientUser };
};

import sendRequest from "../../utils/sendRequest";
const BASE_URL = import.meta.env.VITE_REACT_APP_URL_API;

// export const getSentMessages = async () => {
//   return await sendRequest({
//     method: "get",
//     url: `${BASE_URL}/v1/messages/sent`,
//   });
// };

// export const getReceivedMessages = async () => {
//   return await sendRequest({
//     method: "get",
//     url: `${BASE_URL}/v1/messages/received`,
//   });
// };

export const getChatWith = async (userId, offset = 0, limit = 10) => {
  return await sendRequest({
    method: "get",
    url: `${BASE_URL}/v1/messages/users/${userId}?order=[["id", "DESC"]]&offset=${offset}&limit=${limit}`,
  });
};

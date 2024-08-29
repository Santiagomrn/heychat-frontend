import sendRequest from "../../utils/sendRequest";
const BASE_URL = import.meta.env.VITE_REACT_APP_URL_API;
export const getUserChats = async (searchText = "", offset = 0, limit = 10) => {
  return await sendRequest({
    method: "get",
    url: `${BASE_URL}/v1/users/chats?offset=${offset}&limit=${limit}&where=[{"firstName":{"$like":"%$${searchText}%"}}]`,
  });
};

export const getUsers = async (searchText = "", offset = 0, limit = 10) => {
  return await sendRequest({
    method: "get",
    url: `${BASE_URL}/v1/users?offset=${offset}&limit=${limit}&where=[{"firstName":{"$like":"%$${searchText}%"}}]`,
  });
};

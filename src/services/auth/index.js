import sendRequest from "../../utils/sendRequest";
const BASE_URL = import.meta.env.VITE_REACT_APP_URL_API;
export const login = async ({ email = "", password = "" }) => {
  return await sendRequest({
    method: "post",
    url: `${BASE_URL}/v1/auth/login`,
    data: {
      email,
      password,
    },
  });
};

export const signUp = async ({
  email = "",
  password = "",
  firstName = "",
  lastName = "",
}) => {
  return await sendRequest({
    method: "post",
    url: `${BASE_URL}/v1/auth/signup`,
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });
};

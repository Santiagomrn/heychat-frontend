import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const sendRequest = async ({ method = "get", url, token = "", data = "" }) => {
  try {
    const response = await axios({
      method,
      data,
      url,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    axios.interceptors.request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sendRequest;

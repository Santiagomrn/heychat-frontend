import { io } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_REACT_APP_URL_API;
export const socket = io(BASE_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  auth: (cb) => {
    cb({ token: localStorage.getItem("token") });
  },
});

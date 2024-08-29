import { createBrowserRouter, Navigate } from "react-router-dom";
import LogIn from "../pages/LogIn/LogIn";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../pages/Chat/Chat";
import SignUp from "../pages/SignUp/SignUp";
import Oauth from "../pages/Oauth/Oauth";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/oauth",
    element: <Oauth />,
  },
]);

import React from "react";
import { useAuth } from "../context/Auth";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;

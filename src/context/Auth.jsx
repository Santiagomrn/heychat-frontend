import React, { createContext, useCallback, useState, useContext } from "react";
import { login } from "../services/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return {};
    }

    return {
      token,
      refreshToken,
    };
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await login({
      email,
      password,
    });
    const { token: token, refreshToken, user = { id: 2 } } = response;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    setData({ token, refreshToken });
  }, []);
  const setCredentials = useCallback(({ token, refreshToken }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    setData({ token, refreshToken });
  }, []);
  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        refreshToken: data.refreshToken,
        setCredentials,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

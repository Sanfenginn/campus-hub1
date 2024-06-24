// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../redux/authSlice"; // 假设你有这个 action
import { useDispatch } from "react-redux";

interface AuthContextType {
  checkTokenExpiration: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenExpirationDate = new Date(
        JSON.parse(atob(token.split(".")[1])).exp * 1000
      );
      console.log("tokenExpirationDate: ", tokenExpirationDate);
      if (tokenExpirationDate <= new Date()) {
        localStorage.removeItem("token");
        dispatch(logout());
        router.push("/");
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <AuthContext.Provider value={{ checkTokenExpiration }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

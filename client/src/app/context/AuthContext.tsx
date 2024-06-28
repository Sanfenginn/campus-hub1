// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout, loginSuccess } from "../redux/authSlice"; // 假设你有这个 action

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
      } else {
        // 假设你有一个 API 可以获取用户信息
        fetchUserFromToken(token).then((user) => {
          dispatch(loginSuccess({ user, token }));
        });
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    setupAxiosInterceptors();
  }, []);

  const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          dispatch(logout());
          router.push("/");
        }
        return Promise.reject(error);
      }
    );
  };

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

// 伪造一个 API 函数来示例如何从 token 获取用户信息
const fetchUserFromToken = async (token: string): Promise<User> => {
  // 模拟 API 调用，这里你应该调用实际的后端 API
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ id: 1, name: "John Doe", email: "john@example.com" }),
      1000
    )
  );
};

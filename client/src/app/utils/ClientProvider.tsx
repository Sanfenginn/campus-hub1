"use client";

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store"; // 确保导入 Redux store
import { AuthProvider } from "../context/AuthContext"; // 修改导入路径

const ClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </ReduxProvider>
  );
};

export default ClientProvider;

"use client";
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import MainContent from "./MainContent";
import SideBar from "./SideBar";

const MainLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col items-center h-screen">
      <NavBar />
      <div className=" w-[80vw] h-full  flex flex-1">
        <div className="flex-[1.5]   ">
          <SideBar />
        </div>
        <main className="  h-full flex-[7] p-4">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

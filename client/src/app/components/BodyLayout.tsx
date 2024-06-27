"use client";
import NavBar from "./NavBar";
import MainContent from "./MainContent";
import SideBar from "./SideBar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col  items-center h-screen ">
      <NavBar />
      <div className=" w-[80vw] h-full flex-grow  flex  overflow-scroll">
        <div className="flex-[1.5] ">
          <SideBar />
        </div>
        <main className="h-full flex-[7] p-4 overflow-scroll">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

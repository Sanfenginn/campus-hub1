import dynamic from "next/dynamic";
import React, { Suspense, lazy, use } from "react";
import { useEffect, useState } from "react";

const UsersPage = dynamic(() => import("../components/UsersContent"));
const CoursesPage = dynamic(() => import("../components/ CoursesContent"));
const ClassesPage = dynamic(() => import("../components/ ClassesContent"));

const DisplayAllUsers = dynamic(
  () => import("../components/usersInterface/DisplayAllUsers")
);
const AddUser = dynamic(() => import("../components/usersInterface/AddUser"));

// const MainContent: React.FC<{ page: string }> = ({ page }) => {
const MainContent: React.FC = () => {
  const [secondFunction, setSecondFunction] = useState<string>("");

  // const secondFunctionFromLocalStorage = localStorage.getItem("secondFunction");

  useEffect(() => {
    const secondFunctionFromLocalStorage =
      localStorage.getItem("secondFunction");
    setSecondFunction(secondFunctionFromLocalStorage || "");
  }, []);

  console.log("secondFunction: ", secondFunction);

  // let ContentComponent;

  // console.log("page in main content: ", page);

  const ContentComponent = () => {
    switch (secondFunction) {
      case "/users/add-user":
        localStorage.removeItem("secondFunction");
        return <AddUser />;
      case "/users":
        localStorage.removeItem("secondFunction");
        return <AddUser />;
      // case "courses":
      //   ContentComponent = CoursesPage;
      //   break;
      // case "classes":
      //   ContentComponent = ClassesPage;
      //   break;
      default:
        return <DisplayAllUsers />;
    }
  };

  return (
    <div className="border-2 border-yellow-500 h-full">
      {/* <h1>Main Content</h1> */}
      <ContentComponent />
    </div>
  );
};

export default MainContent;

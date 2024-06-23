import dynamic from "next/dynamic";
import React, { Suspense, lazy } from "react";

const UsersPage = dynamic(() => import("../components/UsersContent"));
const CoursesPage = dynamic(() => import("../components/ CoursesContent"));
const ClassesPage = dynamic(() => import("../components/ ClassesContent"));

// const MainContent: React.FC<{ page: string }> = ({ page }) => {
const MainContent: React.FC = () => {
  const secondFunction = localStorage.getItem("secondFunction");

  console.log("secondFunction: ", secondFunction);

  let ContentComponent;

  // console.log("page in main content: ", page);

  // switch (page) {
  //   case "users":
  //     ContentComponent = UsersPage;
  //     console.log("content component: ", ContentComponent);
  //     break;
  //   case "courses":
  //     ContentComponent = CoursesPage;
  //     break;
  //   case "classes":
  //     ContentComponent = ClassesPage;
  //     break;
  //   default:
  //     ContentComponent = () => (
  //       <div>Select a page from the navigation menu.</div>
  //     );
  // }

  // switch (page) {
  //   case "Users":
  //     ContentComponent = UsersPage;
  //     console.log("content component: ", ContentComponent);
  //     break;
  //   case "Courses":
  //     ContentComponent = CoursesPage;
  //     break;
  //   case "Classes":
  //     ContentComponent = ClassesPage;
  //     break;
  //   default:
  //     ContentComponent = () => (
  //       <div>Select a page from the navigation menu.</div>
  //     );
  // }

  return (
    <div className="border-2 border-yellow-500 h-full">
      <h1>Main Content</h1>
    </div>
  );
};

export default MainContent;

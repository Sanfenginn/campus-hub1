import dynamic from "next/dynamic";
import React, { Suspense, lazy, use } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // 导入 RootState 类型

const UsersPage = dynamic(() => import("../components/UsersContent"));
const CoursesPage = dynamic(() => import("../components/ CoursesContent"));
const ClassesPage = dynamic(() => import("../components/ ClassesContent"));
const AddManyUsers = dynamic(
  () => import("./usersInterface/bulkAddUsers/BulkAddUsers")
);
const PermissionsSetting = dynamic(
  () => import("./usersInterface/permissionsSetting/PermissionsSetting")
);
const DisplayAllUsers = dynamic(
  () => import("./usersInterface/displayAllUsers/DisplayAllUsers")
);
const AddUser = dynamic(() => import("../components/usersInterface/AddUser"));

const MainContent: React.FC = () => {
  const secondFunction = useSelector(
    (state: RootState) => state.secondFunction.secondFunction
  );
  const userRole = localStorage.getItem("userRole");

  const AdminContentComponent = () => {
    switch (secondFunction) {
      case "/users/add-user":
        return <AddUser />;
      case "/users":
        return <AddUser />;
      case "/users/add-many":
        return <AddManyUsers />;
      case "/users/permissions":
        return <PermissionsSetting />;
      default:
        return <DisplayAllUsers />;
    }
  };

  return (
    <div className=" h-full">
      {userRole === "admin" && <AdminContentComponent />}
    </div>
  );
};

export default MainContent;

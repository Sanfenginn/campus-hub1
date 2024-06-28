import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // 导入 RootState 类型

const currentPage = localStorage.getItem("currentPage");

const AddManyUsers = dynamic(
  () => import("./usersInterface/bulkAddUsers/BulkAddUsers")
);
const PermissionsSetting = dynamic(
  () => import("./usersInterface/permissionsSetting/PermissionsSetting")
);
const DisplayAllUsers = dynamic(
  () => import("./usersInterface/displayAllUsers/DisplayAllUsers")
);
const DisplayAllCourses = dynamic(
  () => import("./coursesInterface/displayAllCourses/DisplayAllCourses")
);

interface ContentComponentProps {
  secondFunction: string;
}

//AdminContentComponent 移出 MainContent 组件，并将 secondFunction 作为 props 传递给它。这样可以避免每次 MainContent 组件重新渲染时重新创建 AdminContentComponent
const AdminContentComponent: React.FC<ContentComponentProps> = ({
  secondFunction,
}) => {
  const currentPage = localStorage.getItem("currentPage");

  console.log("currentPage: ", currentPage);
  console.log("secondFunction: ", secondFunction);

  if (currentPage === "users") {
    switch (secondFunction) {
      case "/users/user-search":
        return <DisplayAllUsers />;
      case "/users/add-many":
        return <AddManyUsers />;
      case "/users/permissions":
        return <PermissionsSetting />;
      default:
        return <DisplayAllUsers />;
    }
  } else if (currentPage === "courses") {
    switch (secondFunction) {
      case "/courses/course-search":
        return <DisplayAllCourses />;
      // Uncomment and add respective components once they are created
      // case "/courses/add-course":
      //   return <AddCourse />;
      // case "/courses/add-many":
      //   return <BulkAddCourses />;
      // case "/courses/course-settings":
      //   return <CourseSettings />;
      default:
        return <DisplayAllCourses />;
    }
  } else {
    return <div>No matching page found</div>;
  }
};

const MainContent: React.FC = () => {
  const secondFunction = useSelector(
    (state: RootState) => state.secondFunction.secondFunction
  );
  const userRole = localStorage.getItem("userRole");

  return (
    <div className="h-full">
      {userRole === "admin" && (
        <AdminContentComponent secondFunction={secondFunction} />
      )}
    </div>
  );
};

export default MainContent;

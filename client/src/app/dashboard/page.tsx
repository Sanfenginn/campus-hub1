"use client";

import MainContent from "../components/MainContent";
import MainLayout from "../components/BodyLayout";

const DashboardPage: React.FC = () => {
  return (
    <MainLayout>
      <div>Welcome to the Dashboard</div>
    </MainLayout>
    // <div>
    //   <h1>dd</h1>
    // </div>
    // <DashboardLayout>
    //   <div>Welcome to the Dashboard</div>
    // </DashboardLayout>
    // <Router>
    //   <div className="flex justify-center  border-2 border-red-500 w-[100vw] h-[100vh]">
    //     <div className="border-2 border-yellow-500  w-[95rem] ">
    //       <div className="flex flex-col h-full">
    //         <div className="border-2 border-black ">
    //           <NavBar onNavigate={handleNavigate} />
    //         </div>
    //         <div className="flex border-2 border-black h-full">
    //           <SideBar />
    //           <MainContent page={currentPage} />
    //           {/* <Routes>
    //             <Route
    //               path="/dashboard/users"
    //               element={<MainContent page="users" />}
    //             />
    //             <Route
    //               path="/dashboard/courses"
    //               element={<MainContent page="courses" />}
    //             />
    //             <Route
    //               path="/dashboard/classes"
    //               element={<MainContent page="classes" />}
    //             />
    //             <Route
    //               path="/dashboard"
    //               element={<MainContent page="home" />}
    //             />
    //           </Routes> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Router>
  );
};

export default DashboardPage;

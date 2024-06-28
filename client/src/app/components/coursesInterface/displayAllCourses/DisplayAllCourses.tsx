import InputBox from "@/app/components/usersInterface/displayAllUsers/InputBox";
import EditUsersButtons from "@/app/components/usersInterface/displayAllUsers/EditUsersButtons";
import UsersList from "@/app/components/usersInterface/displayAllUsers/UsersList";

const DisplayAllCourses: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className=" flex  items-center ">
        <div className="ml-2 h-full flex-grow ">
          <InputBox />
        </div>
      </div>
      <div className=" flex justify-end">
        <EditUsersButtons />
      </div>
      <div className=" flex-grow h-[500px]  ">
        <UsersList />
      </div>
    </div>
  );
};

export default DisplayAllCourses;

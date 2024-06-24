import InputBox from "./InputBox";
import SelectBox from "./SelectBox";
import { useState } from "react";
import UsersList from "./UsersList";
import EditUsersButtons from "./EditUsersButtons";

const DisplayAllUsersLayout: React.FC = () => {
  const [condition, setCondition] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className=" flex  items-center ">
        <div className="">
          <SelectBox onChange={setCondition} />
        </div>
        <div className="ml-2 h-full flex-grow ">
          <InputBox condition={condition} />
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

export default DisplayAllUsersLayout;

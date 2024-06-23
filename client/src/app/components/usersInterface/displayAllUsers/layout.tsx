import InputBox from "./InputBox";
import SelectBox from "./SelectBox";
import { useState } from "react";
import SearchButton from "./SearchButton";

const DisplayAllUsersLayout: React.FC = () => {
  const [condition, setCondition] = useState("");

  return (
    <div className="flex ">
      <SelectBox onChange={setCondition} />
      <div className="ml-2   ">
        <InputBox condition={condition} />
      </div>
      <SearchButton />
      <div className="ml-2">
        <SearchButton />
      </div>
    </div>
  );
};

export default DisplayAllUsersLayout;

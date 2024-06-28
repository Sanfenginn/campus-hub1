import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import getUsersData from "../../../api/getUsersData";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setUsersData } from "@/app/redux/usersData";
import getCourses from "@/app/api/getCourses";
import { setCoursesData } from "@/app/redux/coursesData";

type InputBoxProps = {
  condition?: string;
};

interface ApiResponse {
  data: {
    message: any[]; // 根据实际返回的数据类型调整
  };
}

interface InputType {
  condition?: string;
  inputValue: string;
}

const InputBox: React.FC<InputBoxProps> = ({ condition }) => {
  const [loading, setLoading] = useState(false);
  const currentPage = localStorage.getItem("currentPage");
  const [conditionInInputBox, setConditionInInputBox] = useState<string>("");

  useEffect(() => {
    let newCondition = condition;
    if (currentPage === "users") {
      newCondition = condition === "" ? "All Users" : condition;
    }
    if (currentPage === "courses") {
      newCondition = "Course Name";
    }
    setConditionInInputBox(newCondition as string);
  }, [condition, currentPage]);

  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);

    const getData = async (
      fetchFunction: (input: InputType) => Promise<ApiResponse>,
      input: InputType
    ) => {
      try {
        const response = await fetchFunction(input);
        if (currentPage === "users") {
          dispatch(setUsersData(response?.data?.message ?? []));
        } else if (currentPage === "courses") {
          dispatch(setCoursesData(response || []));
        }
        console.log("response in input:", response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentPage === "users") {
      const input: InputType = {
        condition: conditionInInputBox,
        inputValue: inputValue,
      };
      getData(getUsersData, input);
    }

    if (currentPage === "courses") {
      const input: string = inputValue;

      getData(getCourses, input);
    }
  };

  return (
    <div className="flex items-center">
      <Box component="form" className="w-full" noValidate autoComplete="off">
        <TextField
          id="outlined-textarea"
          label={`search by ${conditionInInputBox} `}
          placeholder={`Type to Search by All ${conditionInInputBox} `}
          multiline
          className="w-full "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Box>
      <div className="ml-2">
        <LoadingButton
          loading={loading}
          variant="outlined"
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
};

export default InputBox;

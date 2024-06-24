import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import getUsersData from "../../../api/getUsersData";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setUsersData } from "@/app/redux/usersData";

type InputBoxProps = {
  condition: string;
};

const InputBox: React.FC<InputBoxProps> = ({ condition }) => {
  const [loading, setLoading] = useState(false);
  condition === "" ? (condition = "All Users") : (condition = condition);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  // console.log("inputValue:", inputValue);
  // console.log("condition:", condition);

  const handleClick = async () => {
    setLoading(true);

    const input = {
      condition,
      inputValue,
    };

    try {
      const response = await getUsersData(input);
      dispatch(setUsersData(response?.data?.message ?? []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <Box component="form" className="w-full" noValidate autoComplete="off">
        <TextField
          id="outlined-textarea"
          label={`search by ${condition} `}
          placeholder={`Type to Search by All ${condition} `}
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
          onClick={handleClick}
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
};

export default InputBox;

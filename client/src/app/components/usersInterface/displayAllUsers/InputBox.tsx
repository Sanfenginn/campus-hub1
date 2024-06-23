import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import getUsersData from "../../../api/getUsersData";

type InputBoxProps = {
  condition: string;
};

const InputBox: React.FC<InputBoxProps> = ({ condition }) => {
  condition === "" ? (condition = "All Users") : (condition = condition);

  console.log("condition:", condition);

  return (
    <Box component="form" className="w-full" noValidate autoComplete="off">
      <TextField
        id="outlined-textarea"
        label={`search by ${condition} `}
        placeholder={`Type to Search by All ${condition} `}
        multiline
        className="w-full "
      />
    </Box>
  );
};

export default InputBox;

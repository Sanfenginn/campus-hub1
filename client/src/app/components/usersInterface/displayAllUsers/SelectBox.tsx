import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

type SelectBoxProps = {
  onChange: (value: string) => void;
};

const SelectBox: React.FC<SelectBoxProps> = ({ onChange }) => {
  const [condition, setCondition] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCondition(value);
    onChange(value); // 传递选中条件到父组件
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Condition
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={condition}
          onChange={handleChange}
          label="Condition"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Role"}>Role</MenuItem>
          <MenuItem value={"Name"}>Name</MenuItem>
          <MenuItem value={"Account"}>Account</MenuItem>
          <MenuItem value={"Dept/Class"}>Dept/Class</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectBox;

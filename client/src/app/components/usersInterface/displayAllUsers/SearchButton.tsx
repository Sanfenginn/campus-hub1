import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";

const SearchButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    // 模拟加载过程
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <LoadingButton loading={loading} variant="outlined" onClick={handleClick}>
      Submit
    </LoadingButton>
  );
};

export default SearchButton;

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

const SearchButton: React.FC = () => {
  const [loading, setLoading] = useState(true);
  function handleClick() {
    setLoading(true);
  }

  return (
    <div>
      <FormControlLabel
        sx={{
          display: "block",
        }}
        control={
          <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
        }
        label="Loading"
      />

      <Box sx={{ "& > button": { m: 1 } }}>
        <LoadingButton
          onClick={handleClick}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          <span>Fetch data</span>
        </LoadingButton>
      </Box>
    </div>
  );
};

export default SearchButton;

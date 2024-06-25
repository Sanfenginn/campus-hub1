import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

type EditUsersButtonsProps = {
  show: boolean;
  handleClose: () => void;
};

const ReminderForEdit: React.FC<EditUsersButtonsProps> = ({
  show,
  handleClose,
}) => {
  console.log("show:", show);

  const selectedUsersIds = useSelector(
    (state: RootState) => state.selectedUsersIds
  );

  const getMessage = () => {
    if (selectedUsersIds.length === 0) {
      return "No user is selected!";
    }

    if (selectedUsersIds.length > 1) {
      return "Only one user can be edited at a time!";
    }
  };

  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  // setOpen(false);

  return (
    <div>
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {getMessage()}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReminderForEdit;

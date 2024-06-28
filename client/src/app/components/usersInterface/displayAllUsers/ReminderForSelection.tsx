import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

type EditUsersButtonsProps = {
  show: boolean;
  handleClose: () => void;
  isUpload: boolean;
  isPermissionChanged: boolean;
};

const ReminderForSelection: React.FC<EditUsersButtonsProps> = ({
  show,
  handleClose,
  isUpload,
  isPermissionChanged,
}) => {
  const selectedUsersIds = useSelector(
    (state: RootState) => state.selectedUsersIds
  );

  const getMessage = () => {
    if (selectedUsersIds.length === 0 && !isUpload && isPermissionChanged) {
      return "No user is selected!";
    }

    if (selectedUsersIds.length > 1 && !isUpload && isPermissionChanged) {
      return "Only one user can be edited at a time!";
    }

    if (isUpload && !isPermissionChanged) {
      return "Please upload the files before submitting them!";
    }

    if (!isPermissionChanged) {
      return "No permissions are changed!";
    }
  };

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

export default ReminderForSelection;

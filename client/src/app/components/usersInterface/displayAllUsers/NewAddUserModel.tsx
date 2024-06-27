import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NewAddUserForm from "./NewAddUserForm";

interface AddUserProps {
  show: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const NewAddUserModel: React.FC<AddUserProps> = ({ show, handleClose }) => {
  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg border-2 border-blue-500"
      sx={{ border: "2px solid yellow" }}
    >
      <Box sx={style}>
        <NewAddUserForm handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default NewAddUserModel;

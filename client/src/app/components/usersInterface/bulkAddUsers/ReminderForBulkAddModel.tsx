import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ReminderForBulkAddProps = {
  show: boolean;
  handleClose: () => void;
  onConfirm: () => void;
};

const ReminderForBulkAdd: React.FC<ReminderForBulkAddProps> = ({
  show,
  handleClose,
  onConfirm,
}) => {
  const handleSave = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={show}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Notice for Uploading Files
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          sx={{ flexGrow: 1 }}
          className="flex flex-col justify-center items-center border-2 border-black"
        >
          <ListItem sx={{ width: "60%", border: "2px solid red" }}>
            <ListItemIcon>
              <Typography>1</Typography>
            </ListItemIcon>
            <ListItemText primary="Required fields: Name, Date of birth, Role, Account number, Password, Phone Number, Email" />
          </ListItem>
          <Divider />
          <ListItem sx={{ width: "60%", border: "2px solid red" }}>
            <ListItemIcon>
              <Typography>2</Typography>
            </ListItemIcon>
            <ListItemText primary="Roles: student, teacher" />
          </ListItem>
          <ListItem sx={{ width: "60%", border: "2px solid red" }}>
            <ListItemIcon>
              <Typography>3</Typography>
            </ListItemIcon>
            <ListItemText primary="Phone number should start with 0 or +61" />
          </ListItem>
          <ListItem sx={{ width: "60%", border: "2px solid red" }}>
            <ListItemIcon>
              <Typography>4</Typography>
            </ListItemIcon>
            <ListItemText primary="Default password: 12345" />
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
};

export default ReminderForBulkAdd;

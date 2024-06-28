import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import bulkDeleteUsers from "@/app/api/deleteUsers";
import getUsersData from "@/app/api/getUsersData";
import { setUsersData } from "@/app/redux/usersData";
import ConfirmDelete from "@/app/components/usersInterface/displayAllUsers/ConfirmDeleteModel";
import { useState } from "react";
import UserModel from "@/app/components/usersInterface/displayAllUsers/UserModel";
import ReminderForSelection from "@/app/components/usersInterface/displayAllUsers/ReminderForSelection";
import { setReminder } from "@/app/redux/reminder";

const EditUsersButtons: React.FC = () => {
  const dispatch = useDispatch();
  const [confirmDeletionModelShow, setConfirmDeletionModelShow] =
    useState(false);
  const [addUserModelShow, setAddUserModelShow] = useState(false);
  const [editUserModelShow, setEditUserModelShow] = useState(false);
  const [reminderForSelectionShow, setReminderForSelectionShow] =
    useState(false);

  const selectedUsersIds = useSelector(
    (state: RootState) => state.selectedUsersIds
  );
  // console.log("selectedUsersIds:", selectedUsersIds);

  const handleConfirmDeletionShow = () => {
    setConfirmDeletionModelShow(true);
  };

  const handleConfirmDeletionClose = () => {
    setConfirmDeletionModelShow(false);
  };

  const handleConfirmDeletion = () => {
    if (selectedUsersIds.length === 0) {
      handleReminderForSelection();
      dispatch(setReminder("edit user no"));
      return;
    }
    handleConfirmDeletionShow();
  };

  const handleDeleteUsers = async () => {
    try {
      await bulkDeleteUsers(selectedUsersIds);
      const responseAfter = await getUsersData({
        condition: "All Users",
        inputValue: "",
      });
      dispatch(setUsersData(responseAfter?.data?.message ?? []));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUserModelShow = () => {
    setAddUserModelShow(true);
  };

  const handleAddUserModelClose = () => {
    setAddUserModelShow(false);
  };

  const handleAddUser = () => {
    handleAddUserModelShow();
  };

  const handleEditUserModelShow = () => {
    setEditUserModelShow(true);
  };

  const handleEditUserModelClose = () => {
    setEditUserModelShow(false);
  };

  const handleReminderForSelectionShow = () => {
    setReminderForSelectionShow(true);
  };

  const handleReminderForSelectionClose = () => {
    setReminderForSelectionShow(false);
  };

  const handleReminderForSelection = () => {
    handleReminderForSelectionShow();
  };

  const handleEditUser = () => {
    if (selectedUsersIds.length > 1) {
      handleReminderForSelection();
      dispatch(setReminder("edit user more"));
      return;
    }
    if (selectedUsersIds.length === 0) {
      handleReminderForSelection();
      dispatch(setReminder("edit user no"));
      return;
    }

    handleEditUserModelShow();
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          className="w-[8rem]"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEditUser}
        >
          Edit
        </Button>
        <Button
          className="w-[8rem]"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
        >
          Add
        </Button>
        <Button
          className="w-[8rem]"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleConfirmDeletion}
        >
          Delete
        </Button>
      </Stack>
      <ConfirmDelete
        show={confirmDeletionModelShow}
        handleClose={handleConfirmDeletionClose}
        onConfirm={handleDeleteUsers}
      />
      <UserModel
        show={addUserModelShow}
        handleCloseAdd={handleAddUserModelClose}
        isEditUser={false}
      />
      <UserModel
        show={editUserModelShow}
        handleCloseEdit={handleEditUserModelClose}
        isEditUser={true}
      />
      <ReminderForSelection
        show={reminderForSelectionShow}
        handleClose={handleReminderForSelectionClose}
      />
    </div>
  );
};

export default EditUsersButtons;

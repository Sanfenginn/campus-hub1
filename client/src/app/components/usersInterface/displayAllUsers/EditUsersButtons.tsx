import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import bulkDeleteUsers from "@/app/api/deleteUsers";
import getUsersData from "@/app/api/getUsersData";
import { useDispatch } from "react-redux";
import { setUsersData } from "@/app/redux/usersData";

const EditUsersButtons: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUsersIds = useSelector(
    (state: RootState) => state.selectedUsersIds
  );
  console.log("selectedUsersIds:", selectedUsersIds);

  const secondFunction = useSelector(
    (state: RootState) => state.secondFunction.secondFunction
  );

  const handleDeleteUsers = async () => {
    try {
      const responseBefore = await bulkDeleteUsers(selectedUsersIds);
      console.log("responseBefore:", responseBefore);
      const responseAfter = await getUsersData({
        condition: "All Users",
        inputValue: "",
      });
      dispatch(setUsersData(responseAfter?.data?.message ?? []));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button className="w-[8rem]" variant="contained" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button className="w-[8rem]" variant="contained" startIcon={<AddIcon />}>
        Add
      </Button>
      <Button
        className="w-[8rem]"
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteUsers}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default EditUsersButtons;

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";

const EditUsersButtons: React.FC = () => {
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
      >
        Delete
      </Button>
      <Button
        className="w-[8rem]"
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Bulk Del
      </Button>
    </Stack>
  );
};

export default EditUsersButtons;

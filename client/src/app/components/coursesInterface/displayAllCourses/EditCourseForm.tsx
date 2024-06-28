import { TextField, Box, Typography, Paper } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import getCourses from "@/app/api/getCourses";
import { setCoursesData } from "@/app/redux/coursesData";
import putCourse from "@/app/api/putCourse";
import { RootState } from "@/app/redux/store";

interface NewAddCoursesFormProps {
  handleClose: () => void;
}

const NewAddCoursesForm: React.FC<NewAddCoursesFormProps> = ({
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [courseName, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const selectedDataInfo = useSelector(
    (state: RootState) => state.selectedDataInfo.selectedDataInfo
  );

  console.log("selectedDataInfo in NewAddCoursesForm:", selectedDataInfo);

  console.log("courseName:", courseName);
  console.log("description:", description);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedCourse = [
      {
        name: courseName,
        description: description,
      },
    ];

    try {
      await putCourse(updatedCourse);
      const response = await getCourses("");
      dispatch(setCoursesData(response || []));
      console.log("response in add course:", response);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCourseNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      className="w-[60rem]"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <TextField
            id="outlined-read-only-input"
            required
            label="Course Name"
            variant="outlined"
            fullWidth
            onChange={handleCourseNameChange}
            value={courseName}
            InputProps={{
              readOnly: false,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            required
            label="Description"
            variant="outlined"
            fullWidth
            onChange={handleDescriptionChange}
            value={description}
            InputProps={{
              readOnly: false,
            }}
          />
        </Box>
      </Paper>
      <Box className="flex gap-4 justify-end" sx={{ "& button": { m: 1 } }}>
        <Button variant="contained" size="medium" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" size="medium" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default NewAddCoursesForm;

import { TextField, Box, Typography, Paper } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import postCourse from "@/app/api/postCourse";
import getCourses from "@/app/api/getCourses";
import { setCoursesData } from "@/app/redux/coursesData";

interface NewAddCoursesFormProps {
  handleClose: () => void;
}

type Courses = [
  {
    name: string;
    description: string;
  }
];

const NewAddCoursesForm: React.FC<NewAddCoursesFormProps> = ({
  handleClose,
}) => {
  const [courseName, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const dispatch = useDispatch();

  console.log("courseName:", courseName);
  console.log("description:", description);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCourse = [
      {
        name: courseName,
        description: description,
      },
    ];

    try {
      await postCourse(newCourse);
      const response = await getCourses("");
      dispatch(setCoursesData(response || []));
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

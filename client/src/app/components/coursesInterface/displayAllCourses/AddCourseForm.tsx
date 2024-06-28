import { TextField, Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import postCourse from "@/app/api/postCourse";
import getCourses from "@/app/api/getCourses";
import { setCoursesData } from "@/app/redux/coursesData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import getTeacher from "@/app/api/getTeacher";
import getStudentClasses from "@/app/api/getStudentClasses";

interface Teacher {
  name: {
    firstName: string;
    lastName: string;
  };
  _id: string;
}

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
  const dispatch = useDispatch();
  const [courseName, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [courseStartDate, setCourseStartDate] = useState<string>("");
  const [courseEndDate, setCourseEndDate] = useState<string>("");
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [instructor, setInstructor] = useState<string>("");
  const [studentClasses, setStudentClasses] = useState<string[]>([]);
  const [classroom, setClassroom] = useState<string>("");
  const [teacherOptions, setTeacherOptions] = useState<Courses | []>([]);
  const [teacherInputValue, setTeacherInputValue] = useState("");
  const [instructorId, setInstructorId] = useState<string>("");
  const [studentClassesInputValue, setStudentClassesInputValue] = useState("");
  const [studentClassesId, setStudentClassesId] = useState<string[]>([]);
  const [studentClassesOptions, setStudentClassesOptions] = useState<
    Courses | []
  >([]);

  useEffect(() => {
    const getStudentsClasses = async () => {
      try {
        const response = await getStudentClasses("");
        setStudentClassesOptions(response ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    getStudentsClasses();
  }, []);

  console.log("courseName:", courseName);
  console.log("description:", description);
  console.log("courseStartDate:", courseStartDate);
  console.log("courseEndDate:", courseEndDate);
  console.log("dayOfWeek:", dayOfWeek);
  console.log("startTime:", startTime);
  console.log("endTime:", endTime);
  console.log("instructor:", instructor);
  console.log("studentClasses:", studentClasses);
  console.log("classroom:", classroom);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCourse = [
      {
        name: courseName,
        description: description,
        classroom: classroom,
        instructor: instructorId,
        studentClasses: studentClassesId,
        courseSchedule: {
          dayOfWeek: dayOfWeek,
          courseTime: { startTime: startTime, endTime: endTime },
          courseDate: { startDate: courseStartDate, endDate: courseEndDate },
        },
      },
    ];
    console.log("newCourse", newCourse);

    try {
      await postCourse(newCourse);
      const response = await getCourses("");
      dispatch(setCoursesData(response || []));
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCourseStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseStartDate(event.target.value);
  };

  const handleCourseEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseEndDate(event.target.value);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleStudentClassesChange = (
    event: SelectChangeEvent<typeof studentClasses>
  ) => {
    setStudentClasses(event.target.value);
  };

  const handleClassroomChange = (
    event: SelectChangeEvent<typeof classroom>
  ) => {
    setClassroom(event.target.value);
  };

  const handleDayOfWeekChange = (event: SelectChangeEvent) => {
    setDayOfWeek(event.target.value);
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

  const handleTeacherInputChange = async (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    try {
      setTeacherInputValue(newInputValue);
      if (newInputValue) {
        const response = await getTeacher(newInputValue);
        console.log("response: ", response);
        setTeacherOptions(response ?? []);
      } else {
        setTeacherOptions([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTeacherInstructorChange = (
    event: React.SyntheticEvent,
    newValue: Teacher | null
  ) => {
    setInstructor(
      newValue ? `${newValue.name.firstName} ${newValue.name.lastName}` : ""
    );
    setInstructorId(newValue ? newValue._id : "");
  };

  const handleStudentClassesInputChange = async (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setStudentClassesInputValue(newInputValue);
  };

  const handleStudentClassesInstructorChange = (
    event: React.SyntheticEvent,
    newValue: Teacher | null
  ) => {
    setStudentClasses(
      newValue ? newValue.map((option: any) => option.className) : []
    );
    setStudentClassesId(
      newValue ? newValue.map((option: any) => option._id) : []
    );
  };

  console.log("studentClassesId: ", studentClassesId);

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
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Course Schedule A
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <TextField
            label="Course Start Date"
            type="date"
            variant="outlined"
            onChange={handleCourseStartDateChange}
            value={courseStartDate}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Course End Date"
            type="date"
            variant="outlined"
            onChange={handleCourseEndDateChange}
            value={courseEndDate}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Course Schedule B
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="grouped-native-select">
              Day of the Week
            </InputLabel>
            <Select
              labelId="grouped-native-select-label"
              id="grouped-native-select"
              value={dayOfWeek}
              label="Day of the Week"
              onChange={handleDayOfWeekChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Mondays"}>Mondays</MenuItem>
              <MenuItem value={"Tuesdays"}>Tuesdays</MenuItem>
              <MenuItem value={"Wednesdays"}>Wednesdays</MenuItem>
              <MenuItem value={"Thursdays"}>Thursdays</MenuItem>
              <MenuItem value={"Fridays"}>Fridays</MenuItem>
              <MenuItem value={"Saturdays"}>Saturdays</MenuItem>
              <MenuItem value={"Sundays"}>Sundays</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-read-only-input"
            required
            label="Start Time"
            variant="outlined"
            fullWidth
            type="time"
            onChange={handleStartTimeChange}
            value={startTime}
            InputProps={{
              readOnly: false,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            required
            label="End Time"
            variant="outlined"
            fullWidth
            type="time"
            onChange={handleEndTimeChange}
            value={endTime}
            InputProps={{
              readOnly: false,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Assignment
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Autocomplete
            fullWidth
            id="free-solo-2-demo"
            disableClearable
            options={teacherOptions}
            getOptionLabel={(option: Teacher) =>
              `${option.name.firstName} ${option.name.lastName}`
            }
            inputValue={teacherInputValue}
            value={
              teacherOptions.find(
                (option) =>
                  `${option.name.firstName} ${option.name.lastName}` ===
                  instructor
              ) || null
            }
            onInputChange={handleTeacherInputChange}
            onChange={handleTeacherInstructorChange}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Instructor Here"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <Autocomplete
            fullWidth
            multiple
            id="tags-outlined"
            options={studentClassesOptions}
            getOptionLabel={(option) => option.className}
            filterSelectedOptions
            inputValue={studentClassesInputValue}
            onInputChange={handleStudentClassesInputChange}
            onChange={handleStudentClassesInstructorChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Classes Here"
                placeholder="Other Classes"
              />
            )}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Classroom</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={classroom}
              label="Classroom"
              onChange={handleClassroomChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Room1"}>Room 1</MenuItem>
              <MenuItem value={"Room2"}>Room 2</MenuItem>
              <MenuItem value={"Room3"}>Room 3</MenuItem>
              <MenuItem value={"Room4"}>Room 4</MenuItem>
              <MenuItem value={"Room5"}>Room 5</MenuItem>
              <MenuItem value={"Room6"}>Room 6</MenuItem>
            </Select>
          </FormControl>
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

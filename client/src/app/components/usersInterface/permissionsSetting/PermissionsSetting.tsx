import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import getRolePermissions from "@/app/api/getRoleWithPermissions";
import { useEffect, useState } from "react";
import ReminderForSelection from "@/app/components/usersInterface/displayAllUsers/ReminderForSelection";
import postRole from "@/app/api/postRoleWithPermissions";
import { setReminder } from "@/app/redux/reminder";
import { useDispatch } from "react-redux";

function not(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly string[], b: readonly string[]) {
  return [...a, ...not(b, a)];
}

interface Permission {
  _id: string;
  permission: string;
}

interface Permissions {
  role: string;
  permissions: Permission[];
}

const PermissionsSetting: React.FC = () => {
  const dispatch = useDispatch();

  const [teacherPermissions, setTeacherPermissions] = useState<Permissions>({
    role: "",
    permissions: [],
  });

  const [studentPermissions, setStudentPermissions] = useState<Permissions>({
    role: "",
    permissions: [],
  });

  const [selectedRoleValue, setSelectedRoleValue] = useState<string>("student");

  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);

  const [isPermissionChanged, setIsPermissionChanged] =
    useState<boolean>(false);

  const [reminderForSelectionModalShow, setReminderForSelectionModalShow] =
    useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRoleValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    const getRoleWithPermissions = async () => {
      try {
        const rolePermissions = await getRolePermissions();

        setTeacherPermissions(rolePermissions[1][0]);
        setStudentPermissions(rolePermissions[1][1]);
        setAllPermissions(rolePermissions[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getRoleWithPermissions();
  }, []);

  useEffect(() => {
    let optionLeft: string[] = [];
    let optionRight: string[] = [];
    if (selectedRoleValue === "teacher") {
      optionRight = teacherPermissions.permissions.map(
        (permission) => permission.permission
      );
    } else {
      optionRight = studentPermissions.permissions.map(
        (permission) => permission.permission
      );
    }
    optionLeft = allPermissions
      .filter((item) => !optionRight.includes(item.permission))
      .map((item) => item.permission);

    setRight(optionRight);
    setLeft(optionLeft);
  }, [
    selectedRoleValue,
    teacherPermissions,
    studentPermissions,
    allPermissions,
  ]);

  const [checked, setChecked] = useState<readonly string[]>([]);
  const [left, setLeft] = useState<readonly string[]>([]);
  const [right, setRight] = useState<readonly string[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: string) => () => {
    setIsPermissionChanged(true);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly string[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly string[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, options: readonly string[]) => (
    <Card className="flex flex-col items-center h-full">
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(options)}
            checked={
              numberOfChecked(options) === options.length &&
              options.length !== 0
            }
            indeterminate={
              numberOfChecked(options) !== options.length &&
              numberOfChecked(options) !== 0
            }
            disabled={options.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(options)}/${options.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {options.map((item: string) => {
          const labelId = `transfer-list-all-item-${item}-label`;

          return (
            <ListItemButton
              key={item}
              role="listitem"
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  const handleReminderForSelectionModalShow = () => {
    setReminderForSelectionModalShow(true);
  };

  const handleReminderForSelectionModalClose = () => {
    setReminderForSelectionModalShow(false);
  };

  const handleSubmit = async () => {
    if (!isPermissionChanged) {
      dispatch(setReminder("permission settings"));
      handleReminderForSelectionModalShow();
      return;
    }

    const selectedPermissions = allPermissions.filter((permission) => {
      return right.includes(permission.permission);
    });

    const role = selectedRoleValue;

    const roleId =
      role === "teacher" ? teacherPermissions._id : studentPermissions._id;

    const finalPermissions = {
      roleId: roleId,
      permissions: selectedPermissions,
    };

    try {
      await postRole(finalPermissions);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Box className="h-full w-full flex flex-col  ">
        <Box className="flex justify-evenly mb-4">
          <FormControl className="border-2 border-black ">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="student"
              onChange={handleChange}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="teacher"
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            className="h-auto"
            sx={{ height: "auto" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
        <Grid
          className="w-full flex-grow overflow-scroll"
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sx={{ height: "100%", width: "40%" }}>
            {customList("Choices", left)}
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 2, mx: 6 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 2, mx: 6 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item sx={{ height: "100%", width: "40%" }}>
            {customList("Chosen", right)}
          </Grid>
        </Grid>
      </Box>
      <ReminderForSelection
        show={reminderForSelectionModalShow}
        handleClose={handleReminderForSelectionModalClose}
      />
    </div>
  );
};

export default PermissionsSetting;

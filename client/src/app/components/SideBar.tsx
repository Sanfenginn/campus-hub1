"use client";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";

type Option = {
  name: string;
  path: string;
};

const SideBar: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);

  const currentPage = localStorage.getItem("currentPage");

  const handleClick = (secondFunction: string) => {
    localStorage.setItem("secondFunction", `${secondFunction}`);
  };

  useEffect(() => {
    if (currentPage === "users") {
      setOptions([
        { name: "Add User", path: "/users/add-user" },
        { name: "User Search", path: "/users/user-search" },
        { name: "Bulk Import and Export", path: "/users/add-many" },
        { name: "Permission Settings", path: "/users/permissions" },
      ]);
    } else if (currentPage === "courses") {
      setOptions([
        { name: "Course Search", path: "/courses/course-search" },
        { name: "Add Course", path: "/courses/add-course" },
        { name: "Bulk Import and Export", path: "/courses/add-many" },
        { name: "Course Settings", path: "/courses/course-settings" },
      ]);
    } else if (currentPage === "classes") {
      setOptions([
        { name: "Class Search", path: "/classes/class-search" },
        { name: "Class Settings", path: "/classes/class-settings" },
      ]);
    }
  }, [currentPage]);

  return (
    <Box component="main" className="h-full w-full p-4 ">
      <CssBaseline />
      <List>
        {options.map((text, index) => (
          <ListItem
            key={text.name}
            disablePadding
            // component={Link}
            // to={text.path}
            onClick={() => {
              handleClick(text.path);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;

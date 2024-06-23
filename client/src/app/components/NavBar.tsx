"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Page = {
  name: string;
  path: string;
};

const NavBar: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<String>("");
  const settings = ["Profile", "Change Password", "Logout"];
  const router = useRouter();

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (userRole === "admin") {
      setPages([
        { name: "users", path: "/users" },
        { name: "courses", path: "/courses" },
        { name: "classes", path: "/classes" },
      ]);
    } else if (userRole === "student") {
      setPages([{ name: "My Courses", path: "/students" }]);
    } else if (userRole === "teacher") {
      setPages([{ name: "My Courses", path: "/teachers" }]);
    }
  }, [userRole]);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    router.push("/");
  };

  const handleSettingClick = (setting: string) => {
    handleCloseUserMenu();
    if (setting === "Logout") {
      handleLogOut();
    } else if (setting === "Profile") {
      router.push("/profile");
    } else if (setting === "Change Password") {
      router.push("/change-password");
    }
  };

  const handlePageClick = (pageName: string) => {
    console.log("pageName: ", pageName);
    handleCloseNavMenu();
    if (pageName === "users") {
      router.push("/users");
      localStorage.setItem("currentPage", "users");
    } else if (pageName === "courses") {
      router.push("/courses");
      localStorage.setItem("currentPage", "courses");
    } else if (pageName === "classes") {
      router.push("/classes");
      localStorage.setItem("currentPage", "classes");
    } else if (pageName === "My Courses") {
      if (userRole === "teacher") {
        router.push("/teachers");
      } else if (userRole === "student") {
        router.push("/students");
      }
      localStorage.setItem("currentPage", "my-courses");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Box
              component="img"
              src="../favicon.ico"
              alt="Logo"
              className="hidden md:flex  h-[40px] w-[40px] mr-2 cursor-pointer"
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className="mr-2 no-underline hidden md:flex font-mono font-bold text-700 text-inherit "
          >
            Campus Hub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={Link}
                  href={page.path}
                  key={page.name}
                  onClick={() => handlePageClick(page.name)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link href="" passHref>
            <Box
              component="img"
              src="../favicon.ico"
              alt="Logo"
              className="xs:flex md:hidden h-[40px] w-[40px] mr-2 cursor-pointer"
            />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            className="flex-grow  mr-2 no-underline xs:flex md:hidden font-mono font-bold text-700 text-inherit "
          >
            Campus Hub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                href={page.path}
                key={page.name}
                onClick={() => handlePageClick(page.name)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleSettingClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

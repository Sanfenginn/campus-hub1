// components/LoginForm.tsx
import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import login from "../api/login";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const account = formData.get("account") as string;
    const password = formData.get("password") as string;

    console.log("account: ", account);
    console.log("password ", password);

    try {
      const response = await login(account, password);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userRole", response.data.userRole);
      // 在登录成功后跳转到系统主界面
      router.push("/users"); // 假设系统主界面的路径是 /dashboard
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className="flex flex-col items-center mt-[2.5rem] ">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="account"
            label="Account"
            name="account"
            autoComplete="account"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;

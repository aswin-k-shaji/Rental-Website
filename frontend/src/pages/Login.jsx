import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Typography } from "@mui/material";

const Login = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "20px 0" }}>
        Login
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;

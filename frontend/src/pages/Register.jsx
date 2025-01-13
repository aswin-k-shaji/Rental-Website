import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Container, Typography } from "@mui/material";

const Register = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", margin: "20px 0" }}>
        Register
      </Typography>
      <RegisterForm />
    </Container>
  );
};

export default Register;

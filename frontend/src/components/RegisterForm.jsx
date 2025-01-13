import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Link, Alert } from "@mui/material";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", { 
        name: username, email, password, userType: "user" 
      });

      if (response.data.success) {
        setMessage("Registration successful! Redirecting...");
        setError("");
        setTimeout(() => window.location.href = "/login", 2000);
      } else {
        setError(response.data.message);
        setMessage("");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f9" }}>
      <Paper elevation={6} sx={{ padding: 4, maxWidth: 400, borderRadius: "10px", textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Username" margin="normal" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth variant="contained" color="primary" sx={{ marginTop: 2, padding: "10px", fontSize: "16px" }} type="submit">
            Register
          </Button>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Already have an account? <Link href="/login" underline="hover" color="primary">Login here</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;

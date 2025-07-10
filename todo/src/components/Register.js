import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Alert } from "@mui/material";

const Register = ({ onRegister, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",

        headers: { "Authorization":"Bearer mysecrettoken",
            "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) onRegister(data.email);
      else setError(data.message || "Registration failed");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained">Register</Button>
          <Button onClick={switchToLogin}>Already have an account? Login</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
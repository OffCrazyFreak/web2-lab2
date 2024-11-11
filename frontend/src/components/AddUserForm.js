import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { addUser } from "../services/api";

export function AddUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addUser(username, password)
      .then(() => {
        alert("User added successfully");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        alert("Failed to add user: " + error.message);
      });
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Add New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add User
        </Button>
      </form>
    </Box>
  );
}

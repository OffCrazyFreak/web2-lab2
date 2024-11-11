import React from "react";
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import { SQLInjection } from "./components/SQLInjection";
import { CSRF } from "./components/CSRF";
import { AddUserForm } from "./components/AddUserForm";

export default function App() {
  return (
    <Container>
      <CssBaseline />

      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Add New User
        </Typography>
        <AddUserForm />
      </Box>

      <hr />

      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          SQL Injection Testing
        </Typography>
        <SQLInjection />
      </Box>

      <hr />

      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          CSRF Testing
        </Typography>
        <CSRF />
      </Box>
    </Container>
  );
}

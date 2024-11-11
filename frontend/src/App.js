import React from "react";
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import SQLInjection from "./components/SQLInjection";
import CSRF from "./components/CSRF";

function App() {
    return (
        <Container>
            <CssBaseline />

            {/* SQL Injection Section */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>SQL Injection Testing</Typography>
                <SQLInjection />
            </Box>

            <hr />

            {/* CSRF Testing Section */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>CSRF Testing</Typography>
                <CSRF />
            </Box>
        </Container>
    );
}

export default App;

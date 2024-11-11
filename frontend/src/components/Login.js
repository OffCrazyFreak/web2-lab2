import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { login } from "../services/api";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const token = await login(username, password);
            onLogin(token, username); // Prosljeđujemo token i username
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <form onSubmit={handleLogin}>
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
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;

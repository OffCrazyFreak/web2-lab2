import React, { useState } from "react";
import { Button, TextField, Box, Typography, Switch } from "@mui/material";
import { logout, changeData } from "../services/api";
import Login from "./Login";

const CSRF = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [csrfToken, setCsrfToken] = useState(null);
    const [useCsrf, setUseCsrf] = useState(true); // State za kontrolu CSRF zaštite
    const [changeUsername, setChangeUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");

    // Funkcija za prijavu koja postavlja CSRF token i status prijave
    const handleLogin = (token) => {
        setCsrfToken(token);
        setIsLoggedIn(true);
    };

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        setCsrfToken(null);
    };

    const handleChangeData = async (event) => {
        event.preventDefault();
        try {
            await changeData(changeUsername, newUsername, csrfToken, useCsrf);
            alert("Username updated successfully");
        } catch (error) {
            alert("Failed to update username: " + error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
            {/* Login/Logout Section */}
            {isLoggedIn ? (
                <>
                    <Typography variant="h5" gutterBottom>Logout</Typography>
                    <Button onClick={handleLogout} variant="contained" color="primary" fullWidth>
                        Logout
                    </Button>
                </>
            ) : (
                <Login onLogin={handleLogin} />
            )}

            <hr />

            {/* CSRF Toggle and Change Data Form */}
            <Typography variant="h5" gutterBottom>Change Username</Typography>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>Without CSRF</Typography>
                <Switch
                    checked={useCsrf}
                    onChange={() => setUseCsrf(!useCsrf)}
                    color="primary"
                />
                <Typography variant="body1" sx={{ ml: 2 }}>With CSRF</Typography>
            </Box>

            <form onSubmit={handleChangeData}>
                <TextField
                    label="Current Username"
                    fullWidth
                    value={changeUsername}
                    onChange={(e) => setChangeUsername(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="New Username"
                    fullWidth
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Username
                </Button>
            </form>
        </Box>
    );
};

export default CSRF;
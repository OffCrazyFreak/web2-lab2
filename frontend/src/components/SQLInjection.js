import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { searchUsers } from "../services/api";

export function SQLInjection() {
  const [useVulnerableEndpoint, setUseVulnerableEndpoint] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  async function handleSearch(event) {
    event.preventDefault();
    try {
      const endpoint = useVulnerableEndpoint ? "/injection" : "";
      const result = await searchUsers(searchQuery, endpoint);
      setUsers(result);
    } catch (error) {
      alert("Search failed: " + error.message);
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Search Users
      </Typography>
      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Vulnerable
        </Typography>
        <Switch
          checked={!useVulnerableEndpoint}
          onChange={() => setUseVulnerableEndpoint(!useVulnerableEndpoint)}
          color="primary"
        />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Secure
        </Typography>
      </Box>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search Username"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Search
        </Button>
      </form>
      {users.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

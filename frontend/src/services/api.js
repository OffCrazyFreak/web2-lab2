import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, null, {
        params: { username, password }
    });
    return response.data; // Vraća CSRF token
};

// Funkcija za odjavu
export const logout = async () => {
    const username = localStorage.getItem("username");
    await axios.post(`${API_URL}/logout`, null, { params: { username } });
};

// Funkcija za promjenu korisničkog imena
export const changeData = async (username, newUsername, csrfToken = null, useCsrf = true) => {
    const endpoint = useCsrf ? `${API_URL}/change-data-csrf` : `${API_URL}/change-data`;
    const params = { username, newUsername };

    // Ako je CSRF zaštita omogućena, dodaj token u parametre
    if (useCsrf && csrfToken) {
        params.token = csrfToken;
    }

    const response = await axios.get(endpoint, { params });
    return response.data;
};

export const searchUsers = async (username, endpoint) => {
    const response = await axios.get(`${API_URL}${endpoint}`, {
        params: { username }
    });
    return response.data;
};

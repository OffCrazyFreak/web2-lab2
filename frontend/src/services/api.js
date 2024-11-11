import axios from "axios";

const API_URL = "/api/users";

export function login(username, password) {
  return axios
    .post(`${API_URL}/login`, null, {
      params: { username, password },
    })
    .then((response) => response.data);
}

export function logout(username) {
  return axios.post(`${API_URL}/logout`, null, { params: { username } });
}

export function changeData(
  username,
  newUsername,
  csrfToken = null,
  useCsrf = true
) {
  const endpoint = useCsrf
    ? `${API_URL}/change-data-csrf`
    : `${API_URL}/change-data`;
  const params = { username, newUsername };

  if (useCsrf && csrfToken) {
    params.token = csrfToken;
  }

  return axios.get(endpoint, { params }).then((response) => response.data);
}

export function searchUsers(username, endpoint) {
  return axios
    .get(`${API_URL}${endpoint}`, { params: { username } })
    .then((response) => response.data);
}

export function addUser(username, password) {
  return axios
    .post(API_URL, { username, password })
    .then((response) => response.data);
}

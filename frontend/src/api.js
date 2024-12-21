import axios from "axios";

const API_BASE_URL = "https://pinnote-app-production.up.railway.app/api";
//const API_BASE_URL = "http://localhost:3000/api";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
  return response.data;
};

export const fetchNotes = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/notes/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createNote = async (noteData, token) => {
  const response = await axios.post(`${API_BASE_URL}/notes`, noteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteNote = async (noteId, token) => {
  await axios.delete(`${API_BASE_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

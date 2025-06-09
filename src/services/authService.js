// src/services/authService.js
//import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://tu-api.com/api/auth/'; // ¡Importante! Reemplaza con la URL de tu API

// Simulación de una llamada a la API
const fakeApiCall = (data) => new Promise(resolve => setTimeout(() => resolve(data), 1000));

const login = async (credentials) => {
  // En un caso real, harías una petición a tu backend:
  // const response = await axios.post(API_URL + 'login', credentials);
  // const { token } = response.data;

  // --- Simulación para desarrollo ---
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsIm5hbWUiOiJUZXN0IFVzZXIiLCJ1c2VyX3R5cGUiOiJzdHVkZW50In0.fakeTokenSignature'; // Token de ejemplo
  // --------------------------------

  localStorage.setItem('token', token);
  return jwtDecode(token);
};

const register = async (userData) => {
  // Petición real:
  // const response = await axios.post(API_URL + 'register', userData);
  // return response.data;
  
  // --- Simulación ---
  console.log("Registrando usuario:", userData);
  return await fakeApiCall({ message: "Registro exitoso. Por favor, inicia sesión." });
  // ----------------
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUserToken = () => {
  return localStorage.getItem('token');
};

const getCurrentUserData = () => {
  const token = getCurrentUserToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token inválido:", error);
    logout();
    return null;
  }
};

const authService = {
  login,
  register,
  logout,
  getCurrentUserToken,
  getCurrentUserData,
};

export default authService;
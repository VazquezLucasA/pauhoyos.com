// src/services/auth.service.js
import axios from 'axios';

// Ensure this URL is correct and your backend is running.
const API_URL = 'http://10.2.56.60:5000/api/auth';

/**
 * Registers a new user.
 * @param {object} userData - The user data for registration.
 * @returns {Promise<object>} The response from the server.
 */
const register = (userData) => {
  // It's good practice to ensure axios is actually imported
  if (!axios) {
    console.error("Axios is not loaded! Cannot make API calls.");
    return Promise.reject(new Error("Axios is not loaded!"));
  }
  return axios.post(`${API_URL}/register`, userData);
};

/**
 * Logs in a user.
 * @param {object} credentials - User's login credentials (e.g., username, password).
 * @returns {Promise<object>} The response from the server, including the token.
 */
const login = async (credentials) => {
  if (!axios) {
    console.error("Axios is not loaded! Cannot make API calls.");
    return Promise.reject(new Error("Axios is not loaded!"));
  }
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data && response.data.token) {
    localStorage.setItem('userToken', response.data.token);
    // Store essential user details for quick access
    if (response.data.user) {
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    // Dispatch an event to notify other components (like Navbar) of auth change
    window.dispatchEvent(new Event('authChange'));
  }
  return response.data;
};

/**
 * Logs out the current user.
 */
const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
  // Dispatch an event to notify other components
  window.dispatchEvent(new Event('authChange'));
};

/**
 * Gets the current user's JWT token from localStorage.
 * @returns {string|null} The token or null if not found.
 */
const getCurrentUserToken = () => {
  return localStorage.getItem('userToken');
};

/**
 * Gets the current user's data from localStorage.
 * @returns {object|null} The user data object or null if not found.
 */
const getCurrentUserData = () => {
  const userDataString = localStorage.getItem('userData');
  try {
    return userDataString ? JSON.parse(userDataString) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

/**
 * Sends a request to the server to initiate the password reset process.
 * @param {string} email_dova - The user's corporate email.
 * @returns {Promise<object>} The response from the server.
 */
const forgotPassword = (email_dova) => {
  if (!axios) {
    console.error("Axios is not loaded! Cannot make API calls.");
    return Promise.reject(new Error("Axios is not loaded!"));
  }
  return axios.post(`${API_URL}/forgot-password`, { email_dova });
};

/**
 * Sends a request to reset the password using a token.
 * @param {string} token - The password reset token.
 * @param {string} password - The new password.
 * @returns {Promise<object>} The response from the server.
 */
const resetPassword = (token, password) => {
  if (!axios) {
    console.error("Axios is not loaded! Cannot make API calls.");
    return Promise.reject(new Error("Axios is not loaded!"));
  }
  return axios.post(`${API_URL}/reset-password/${token}`, { password });
};

// Export all functions as part of an object
const authService = {
  register,
  login,
  logout,
  getCurrentUserToken,
  getCurrentUserData,
  forgotPassword,
  resetPassword,
};

export default authService;
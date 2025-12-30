import api from './api';

const USER_KEY = 'userData';

const saveUser = (user) => {
  if (!user) {
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event('authChange'));
    return null;
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('authChange'));
  return user;
};

const getCurrentUserData = () => {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

const isAuthenticated = () => Boolean(getCurrentUserData());

const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

const verifyEmail = async (token) => {
  const { data } = await api.get(`/auth/confirm-email?token=${token}`);
  return data;
};

const login = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  // backend setea cookie; guardamos user básico para el front
  saveUser(data.user);
  return data;
};

const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch {
    // ignore network errors on logout
  }
  saveUser(null);
};

const forgotPassword = async (email) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};

const resetPassword = async (token, password) => {
  const { data } = await api.post(`/auth/reset-password?token=${token}`, { password });
  return data;
};

const fetchMe = async () => {
  const { data } = await api.get('/auth/me');
  saveUser(data.user);
  return data.user;
};

const authService = {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  fetchMe,
  getCurrentUserData,
  isAuthenticated,
};

export default authService;

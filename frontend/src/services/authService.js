import { api } from '../utils/api';

export const authService = {
  login: async (imageBlob) => {
    try {
      const response = await api.login(imageBlob);
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  signup: async (imageBlob) => {
    try {
      const response = await api.signup(imageBlob);
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
}; 
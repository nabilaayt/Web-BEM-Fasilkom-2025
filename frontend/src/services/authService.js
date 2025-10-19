import api from "./api";

const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/me");
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.delete("/logout");
    return response.data;
  },
};

export default authService;

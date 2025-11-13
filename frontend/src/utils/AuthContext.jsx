/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      toast.success("Login berhasil!");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.msg || "Login gagal";
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success("Logout berhasil!");
      navigate("/");
      setTimeout(() => setUser(null), 100);
    } catch (err) {
      console.error(err);
      toast.error("Logout gagal");
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

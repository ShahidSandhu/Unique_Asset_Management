import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setUser({ token: access });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Add the Axios interceptor here to attach the token to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AuthContext;

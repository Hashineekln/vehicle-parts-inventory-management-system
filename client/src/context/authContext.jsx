import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const login = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", values);
      setCurrentUser(res.data);
      return res.data; // Return user data
    } catch (error) {
      console.error("Login failed:", error);
      setCurrentUser(null);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, set error state here or handle it as needed
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

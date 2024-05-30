import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = async (values) => {
    const res = await axios.post("http://localhost:5000/auth/login", values);
    setCurrentUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

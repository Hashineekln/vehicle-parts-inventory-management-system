import { createContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';


export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const[currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));

    const login = async (values) => {
    const res = await axios.post("http://localhost:5000/auth/login", values)  
    setCurrentUser(res.data);

};
const logout = async (values) => {
    const res = await axios.post("http://localhost:5000/auth/logout", values)  
    setCurrentUser(null);
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
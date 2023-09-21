import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    isAdmin: false,
    setIsAdmin: () => {}
  });
export const AuthProvider = ({ children }) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.post(`${API_BASE_URL}/api/verification/verify-token`, { token: token })
                .then(response => {
                    console.log(response.data)
                    if (response.data.isValid) {
                        setIsAuthenticated(true);
                        setIsAdmin(response.data.isAdmin);
                  }   else {
                        localStorage.removeItem('authToken');
                        setIsAuthenticated(false);
                        setIsAdmin(false);
                    }
                })
                .catch(error => {
                    console.error("Hubo un error al verificar el token", error);
                    localStorage.removeItem('authToken');
                    setIsAuthenticated(false);
                });
        }
    }, [API_BASE_URL]);

    return (
<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin}}>
    {children}
</AuthContext.Provider>

    );
}

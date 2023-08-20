import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    isAdmin: false,
    setIsAdmin: () => {}
  });
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.post('http://localhost:8080/api/verification/verify-token', { token: token })
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
    }, []);

    return (
<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin}}>
    {children}
</AuthContext.Provider>

    );
}

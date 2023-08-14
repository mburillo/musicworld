import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:8080/verify-token', { token: token })
                .then(response => {
                    if (response.data.isValid) {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                    }
                })
                .catch(error => {
                    console.error("Hubo un error al verificar el token", error);
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

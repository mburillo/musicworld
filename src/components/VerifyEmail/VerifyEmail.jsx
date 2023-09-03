import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.post('https://musicworld.onrender.com/api/verification/verify-email', { token });
                console.log(response)
                if (response.data.success) {
                    localStorage.setItem("authToken", response.data.token);
                    setSuccess(true);
                }
            } catch (error) {
                console.error('Error verifying email:', error);
            } finally {
                setLoading(false);
            }
        };
        
        verify();
    }, [token]);

    if (loading) {
        return <div>Verificando...</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {success ? (
                <div className="text-center">
                    <h1>Verificación exitosa</h1>
                    <p>Tu cuenta ha sido verificada. Serás redirigido a la página de inicio en unos momentos.</p>
                    {setTimeout(() => navigate('/'), 3000)}
                </div>
            ) : (
                <div className="text-center">
                    <h1>Error en la verificación</h1>
                    <p>Ha ocurrido un error al verificar tu cuenta. Por favor, intenta nuevamente o contacta al soporte.</p>
                </div>
            )}
        </div>
    );    
};

export default VerifyEmail;

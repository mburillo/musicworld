import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseGuestRoute from '../../routes/UseGuestRoute';

const RecoverPassword = () => {
    UseGuestRoute();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/verification/send-recovery-email`);
                console.log(response)
                if (response.data.success) {
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
        <div>
            {success ? (
                <div>
                    <h1>Verificación exitosa</h1>
                    <p>Tu cuenta ha sido verificada. Serás redirigido a la página de inicio en unos momentos.</p>
                    {setTimeout(() => navigate('/'), 3000)}
                </div>
            ) : (
                <div>
                    <h1>Error en la verificación</h1>
                    <p>Ha ocurrido un error al verificar tu cuenta. Por favor, intenta nuevamente o contacta al soporte.</p>
                </div>
            )}
        </div>
    );
};

export default RecoverPassword;

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
                const response = await axios.post('https://musicworldspring-production.up.railway.app/api/verification/verify-email', { token });
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
                    <h1>Successful verification</h1>
                    <p>Your account has been verified. You will be redirected in a few seconds</p>
                    {setTimeout(() => navigate('/'), 3000)}
                </div>
            ) : (
                <div className="text-center">
                    <h1>An error has occurred</h1>
                    <p>We could not verify your account. Please try again or contact our customer support</p>
                </div>
            )}
        </div>
    );    
};

export default VerifyEmail;

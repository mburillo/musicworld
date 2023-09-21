import React, { useState, useEffect } from 'react';
import {  useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SendToPasswordUpdate = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState(null);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/verification/verify-password-token`, { token });
                console.log(response.data)
                if (response.data) {
                    setEmail(response.data);
                    setSuccess(true);
                }
            } catch (error) {
                console.error('Error verifying email:', error);
            } finally {
                setLoading(false);
            }
        };
        
        verify();
    }, [token, API_BASE_URL]);

    if (loading) {
        return <div>Verifying...</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {success ? (
                <div className="text-center">
                    <h1>Successful verification</h1>
                    <p>This link has been verified. You will be redirected in a few seconds</p>
                    {setTimeout(() => navigate('/update-password', { state: { email } }), 3000)}
                </div>
            ) : (
                <div className="text-center">
                    <h1>An error has occurred</h1>
                    <p>We could not verify this link. Please try again or contact our customer support</p>
                </div>
            )}
        </div>
    );    
};

export default SendToPasswordUpdate;

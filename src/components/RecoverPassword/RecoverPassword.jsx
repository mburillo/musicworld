import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
    }, [token, API_BASE_URL]);

    if (loading) {
        return <div>Verifying...</div>;
    }

    return (
<div>
    {success ? (
        <div>
            <h1>Verification Successful</h1>
            <p>Your account has been verified. You will be redirected to the home page in a few moments.</p>
            {setTimeout(() => navigate('/'), 3000)}
        </div>
    ) : (
        <div>
            <h1>Verification Error</h1>
            <p>An error occurred while verifying your account. Please try again or contact support.</p>
        </div>
    )}
</div>

    );
};

export default RecoverPassword;

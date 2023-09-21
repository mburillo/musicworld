import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UseGuestRoute from '../../routes/UseGuestRoute';

function Register() {
    UseGuestRoute();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [registrationMessage, setRegistrationMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleRegister = async (event) => {
        event.preventDefault();        
        try {
            await axios.post(`${API_BASE_URL}/api/user/register`, formData);
            setRegistrationMessage("Your account has been saved. Check your email address.");
        } catch (error) {
            console.error("Error:", error.response.data);
        }
    };

      
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
            <h2>Register</h2>
            
            <form onSubmit={handleRegister} className="w-25">
                <div className="mb-3">
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </div>
                <div className="mb-3 text-center">
                    <Link to="/login">Already have an account?</Link>
                </div>
            </form>
            {registrationMessage && <div className="mb-3 alert alert-success">{registrationMessage}</div>}
        </div>
    );
}

export default Register;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 

  const handlePasswordRecovery = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/verification/forgot-password`, { email });
      if(response.data){

        setMessage("If that email address is in our system, we've just sent you password reset instructions.");
      }


    } catch (error) {
      console.error("Error:", error.response.data);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
      <h2>Recover password</h2>
      <form onSubmit={handlePasswordRecovery} className="w-25">
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">Send email</button>
        </div>
        <div className="mb-3 text-center">
          <Link to="/login">Remember your password?</Link>
        </div>
        {message && <div className="text-center mt-3">{message}</div>} 
      </form>
    </div>
  );
}

export default ForgotPassword;

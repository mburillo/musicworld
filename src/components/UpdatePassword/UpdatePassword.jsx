import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/verification/update-password`, { email, password });
      console.log(response)
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      setError('Error updating the password');
    }
  };

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit}>
        <h1>Update password</h1>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">Updated password succesfully. Redirecting...</p>}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Your new password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm new password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;

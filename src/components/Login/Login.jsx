import React, { useState, useContext } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseGuestRoute from '../../routes/UseGuestRoute';
import { AuthContext } from '../../authContext/AuthProvider';
function Login() {
  UseGuestRoute()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
});

const navigate = useNavigate();
const { setIsAuthenticated, setIsAdmin } = useContext(AuthContext);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({ ...prevState, [name]: value }));
}

const handleLogin = async (event) => {
    event.preventDefault();        
        try {
            const response = await axios.post('http://localhost:8080/api/verification/login', formData);
            const token = response.data.token;
            console.log(response.data)
            localStorage.setItem('authToken', token);
            setIsAuthenticated(true);
            setIsAdmin(response.data.isAdmin);
            navigate('/')
        } catch (error) {
            console.error("Hubo un error en el registro:", error.response.data);
        }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="w-25">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"           
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </div>
        <div className="mb-3 text-center">
          <Link to="/register">Register</Link>
          <br />
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

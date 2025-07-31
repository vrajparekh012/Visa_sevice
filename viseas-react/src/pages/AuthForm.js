import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ isRegistering, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegistering
      ? 'http://localhost:5000/api/v1/auth/register'
      : 'http://localhost:5000/api/v1/auth/login';

    const payload = isRegistering
      ? { name, email, password }
      : { email, password };

    try {
      const res = await axios.post(endpoint, payload);

      if (res.data) {
        setMessage(res.data.message || `${isRegistering ? 'Registered' : 'Logged in'} successfully`);

        if (!isRegistering && res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          onLoginSuccess?.(res.data.user);
          navigate('/'); // ✅ Go to home after login
        }

        if (isRegistering && res.status === 201) {
          navigate('/login'); // ✅ Go to login after successful register
        }
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        `${isRegistering ? 'Registration' : 'Login'} failed`
      );
    }
  };

  const toggleAuthMode = () => {
    navigate(isRegistering ? '/login' : '/register');
  };

  return (
    <div className="auth-container">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>

      {message && <div className="auth-message">{message}</div>}

      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <button className="auth-toggle" onClick={toggleAuthMode}>
        {isRegistering
          ? 'Already have an account? Login'
          : 'Need an account? Register'}
      </button>
    </div>
  );
};

export default AuthForm;

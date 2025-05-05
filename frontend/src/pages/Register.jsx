import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/log-in'), 1200); // Slight delay before redirect
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Register for your own account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="fullName">Full name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your Full name"
            required
            value={form.fullName}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your Username"
            required
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

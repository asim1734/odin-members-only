import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/log-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        navigate('/');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Log In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;

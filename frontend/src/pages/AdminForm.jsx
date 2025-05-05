import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminForm() {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/admin-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ keyword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('You are now an admin!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setError(data.error || 'Incorrect keyword, please try again.');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Become an Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="keyword">Enter the admin keyword</label>
        <input
          type="password"
          name="keyword"
          id="keyword"
          required
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminForm;

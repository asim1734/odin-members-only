import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewMessage() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/new-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Message created!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setError(data.error || 'Failed to create message.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Write your message"
          style={{ width: '100%', minHeight: '80px' }}
        />
        <button type="submit">Create message!</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default NewMessage;

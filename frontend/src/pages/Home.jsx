import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Home() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/current-user', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));

    fetch('/api/messages', { credentials: 'include' })
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }, []);

  const handleLogout = async () => {
    await fetch('/log-out', { credentials: 'include' });
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      {/* Header / Navbar */}
      <header className="main-header">
        <div className="container header-flex">
          <h1 className="logo" onClick={() => navigate('/')}>
            ClubHouse
          </h1>
          <nav>
            {user ? (
              <>
                <span className="user-badge">Hello, {user.username}</span>
                <button className="nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-btn" to="/log-in">
                  Login
                </Link>
                <Link className="nav-btn" to="/register">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        {/* Membership/Actions */}
        <section style={{ margin: '1.5rem 0' }}>
          {user && !user.ismember && (
            <button onClick={() => navigate('/new-member')} className="sec-btn">
              Become a member
            </button>
          )}
          {user && user.ismember && (
            <button
              onClick={() => navigate('/new-message')}
              className="sec-btn"
            >
              Write a message
            </button>
          )}
          {user && user.ismember && !user.is_admin && (
            <button onClick={() => navigate('/admin-form')} className="sec-btn">
              Become admin
            </button>
          )}
        </section>

        {/* All messages */}
        <section>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            All Messages
          </h2>
          {messages.length === 0 ? (
            <div className="empty-msg">No messages yet.</div>
          ) : (
            <ul className="message-list">
              {messages.map((message) => (
                <li className="message" key={message.id}>
                  <div className="content">
                    <div className="msg-header">
                      {user?.ismember && (
                        <>
                          <strong>{message.full_name}</strong>
                          <span className="msg-username">
                            (@{message.username})
                          </span>
                        </>
                      )}
                    </div>
                    <p>{message.content}</p>
                    <p className="date">{formatDate(message.created_at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;

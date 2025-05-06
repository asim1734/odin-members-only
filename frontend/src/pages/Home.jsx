import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../components/Message'; // <-- import here

function Home() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/current-user', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));

    fetchMessages();
  }, []);

  function fetchMessages() {
    fetch('/api/messages', { credentials: 'include' })
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => setMessages([]));
  }

  const handleLogout = async () => {
    await fetch('/log-out', { credentials: 'include' });
    setUser(null);
    navigate('/');
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?'))
      return;
    const res = await fetch(`/api/messages/${messageId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      setMessages((msgs) => msgs.filter((msg) => msg.id !== messageId));
    } else {
      alert(data.error || 'Failed to delete message');
    }
  };

  return (
    <div>
      {/* ...header and nav (as before)... */}
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
                <Message
                  key={message.id}
                  message={message}
                  user={user}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;

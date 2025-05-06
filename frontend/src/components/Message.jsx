import React from 'react';

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

function Message({ message, user, onDelete }) {
  return (
    <li className="message">
      <div className="content">
        <div className="msg-header">
          {user?.ismember && (
            <>
              <strong>{message.full_name}</strong>
              <span className="msg-username">(@{message.username})</span>
            </>
          )}
        </div>
        <p>{message.content}</p>
        <p className="date">{formatDate(message.created_at)}</p>
        {user?.is_admin && (
          <button
            className="sec-btn"
            style={{ marginTop: '7px', background: '#c0392b', color: '#fff' }}
            onClick={() => onDelete(message.id)}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}

export default Message;

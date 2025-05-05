# Odin Members-Only

A secure message board web app, built with an **Express.js backend** and a **React (Vite) SPA frontend**. Features authentication, membership, admin elevation, and the ability to post messages. This project follows best practices for a full-stack app with separate backend and frontend directories.

## Features

- **Authentication**: Passport.js local strategy (username/password)
- **Register/Login/Logout**: User-friendly SPA forms
- **Membership & Admin Roles**:
  - Become a member with a secret keyword
  - Become an admin with a different keyword
- **Post Messages**:
  - Members can post messages
  - Messages display sender details (for members)
- **Modern UI**: Clean, mobile-friendly React design
- **Secure**: Passwords are hashed, sessions managed server-side

## Architecture

Collapse
project-root/
│
├── backend/ # Express.js API server & authentication
│ ├── config/ # Passport setup
│ ├── controller/ # MVC controllers
│ ├── model/ # Database queries
│ ├── routes/ # Express routes (API + auth)
│ ├── styles/ # (optional, for static serving)
│ ├── app.js # Backend server entry point
│ └── ...
│
├── frontend/ # React (+ Vite) SPA
│ ├── public/ # global.css, index.html
│ ├── src/ # React components & pages
│ ├── vite.config.js# For local API proxy
│ ├── package.json # Frontend dependencies/scripts
│ └── ...
│
└── README.md

# Getting Started

## Requirements

- **Node.js** and **npm**
- **PostgreSQL** or compatible SQL database

## 1. Clone & Install

```bash
git clone https://github.com/your-username/odin-members-only.git
cd odin-members-only

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 2. Configure Your Environment

Create a .env file in /backend with your DB credentials.
Sample:

DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=odin_members
DB_HOST=localhost
DB_PORT=5432
SESSION_SECRET=your-session-secret

## 3. Database Setup

Create the database and tables according to your model.
Example tables:
users (id, username, full_name, password, ismember, is_admin, ...)
messages (id, user_id, content, created_at, ...)
You can find SQL definitions in backend/model/queries.js or equivalent.

## 4. Run the App

Backend (API server):

```bash
cd backend
npm start # or: node app.js
```

Frontend (React dev server):

```bash
cd ../frontend
npm run dev
```

Frontend usually runs on http://localhost:5173  
Backend runs on http://localhost:3001  
API endpoints are proxied from frontend to backend via Vite vite.config.js

## Usage

Visit the frontend URL.  
Register an account, login, become a member (keyword: cats), and optionally an admin (keyword: dogs).  
Members can post new messages.  
Only members (and admins) see full user info next to messages.

## Main Tech Stack

- Backend: Express.js, Passport.js, bcrypt, express-session, PostgreSQL
- Frontend: React (+ Vite), react-router-dom, global CSS
- Sessions: Cookie/session-based auth (secure for local development)

## Customization

- Change member/admin keywords in mainController.js
- Adjust colors/themes in frontend/public/global.css
- Add features (profile pages, message editing, etc.) as desired!

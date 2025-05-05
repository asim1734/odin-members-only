import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Member from './pages/Member';
import NewMessage from './pages/NewMessage';
import AdminForm from './pages/AdminForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/new-member" element={<Member />} />
        <Route path="/new-message" element={<NewMessage />} />
        <Route path="/admin-form" element={<AdminForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

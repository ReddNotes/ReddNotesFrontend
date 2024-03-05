// modules
import { Routes, Route } from 'react-router-dom';

// 
import './App.css';

// pages
import Login from './../pages/Login/login.jsx';
import Register from './../pages/Register/register.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App;

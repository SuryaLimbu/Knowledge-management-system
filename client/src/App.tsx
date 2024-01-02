import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
// import Navbar from './components/ui/navbar/Navbar';
import Dashboard from './pages/Dashboard';
// import Users from './pages/Users';
import Login from './pages/auth/Login';

function App() {
  return (
    <div className="App bg-slate-100">

      <Router>
        <Routes>
          {/* <Route path='/users' element={<Users />} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;

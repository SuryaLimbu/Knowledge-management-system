// Import necessary modules/components
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import MainLayout from './components/ui/layouts/MainLayout';
import Users from './pages/Users';
import { useState } from 'react';
import LogoutAfterInactivity from './components/LogoutAfterInactivity/LogoutAfterInactivity';
import { logoutUser } from './components/logout/Logout';
import { getUser } from './utility/userUtils';


interface User {
  'userId': string
}

function App() {
  // const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(getUser());



  return (
    <div className="App">
      <Router>
        <Routes>
          {user?.userId ? (

            <Route path='/*' element={<MainLayout />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='users' element={<Users />} />
              {/* Redirect any unmatched routes to Dashboard */}
              <Route path='*' element={<Navigate to='dashboard' />} />
            </Route>
          ) : (
            <Route path='/' element={<Login />} />
          )}
          {/* Redirect to login if the user is not authenticated */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

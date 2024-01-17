// Import necessary modules/components
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import MainLayout from './components/ui/layouts/MainLayout';
import Users from './pages/users/Users';
import { useState } from 'react';
import LogoutAfterInactivity from './components/LogoutAfterInactivity/LogoutAfterInactivity';
import { logoutUser } from './components/logout/Logout';
import { getUser } from './utility/userUtils';
import CreateUser from './pages/users/createUser';
import EditUser from './pages/users/editUser';
import DeleteUser from './pages/users/deleteUser';
import Branch from './pages/branch';
import CreateBranch from './pages/branch/createBranch';
import UpdateBranch from './pages/branch/updateBranch';
import Project from './pages/project';
import TaskPage from './pages/project/task';
import Client from './pages/client';
import Announcement from './pages/announcement';


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
              <Route path='createUser' element={<CreateUser />} />
              <Route path='updateUser/:userId' element={<EditUser />} />
              <Route path='deleteUser/:userId' element={<DeleteUser />} />

              {/* Branch route */}
              <Route path='branch' element={<Branch />} />
              <Route path='createBranch' element={<CreateBranch />} />
              <Route path='updateBranch/:title' element={<UpdateBranch />} />


              <Route path='project' element={<Project />} />
              <Route path='project/:id' element={<TaskPage />} />
              <Route path='project' element={<Project />} />

              < Route path='client' element={<Client />} />
              < Route path='client/:id' element={<Project />} />

              < Route path='announcement' element={<Announcement />} />
              < Route path='announcement/:id' element={<Announcement />} />

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

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './utils/context/auth';
import Navbar from './components/ui/Navbar/navbar';
import './App.css';
import RequireAuth from './components/auth/RequireAuth';
import UserProfile from './pages/UserProfile';

function App(): React.ReactElement {
  return (
    <div className="App">
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Navbar />} >
          {/* Public Routes */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />

          {/* Auth User Routes */}
          <Route element={<RequireAuth />} >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user-profile' element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;

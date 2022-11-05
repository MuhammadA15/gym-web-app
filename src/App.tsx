import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/Home';
import { AuthProvider } from './context/auth';
import Navbar from './components/ui/Navbar/navbar';
import './App.css';
import RequireAuth from './components/auth/RequireAuth';
import UserProfile from './pages/UserProfile';
import SearchPage from './pages/Search';
import ExerciseItem from './pages/ExerciseItem';

function App(): React.ReactElement {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navbar />} >
            {/* Public Routes */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />

            {/* Auth User Routes */}
            <Route element={<RequireAuth />} >
              <Route path='/home' element={<HomePage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/exercise/:exerciseId' element={<ExerciseItem />} />
              <Route path='/user-profile/:tabId' element={<UserProfile />} />
              <Route path='/user-profile' element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

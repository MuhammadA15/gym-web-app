import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import Navbar from './components/ui/Navbar/navbar';
import './App.css';

function App(): React.ReactElement {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navbar />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

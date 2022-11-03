import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userId) {
      navigate('/login', {state: {path: location.pathname}})
    }
  }, [userId])

  return <Outlet />
}

export default RequireAuth
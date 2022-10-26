import React, { useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/auth'

const RequireAuth = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!auth?.user) {
      navigate('/login', {state: {path: location.pathname}})
    }
  }, [auth?.user])

  return <Outlet />
}

export default RequireAuth
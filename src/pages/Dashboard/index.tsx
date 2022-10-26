import React from 'react'
import { useAuth } from '../../utils/context/auth'

const Dashboard = () => {
  
  const auth = useAuth();

  return (
    <div>{auth?.user}'s Dashboard</div>
  )
}

export default Dashboard
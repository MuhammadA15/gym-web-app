import React from 'react'
import { useAuth } from '../../context/auth'

const UserProfile = () => {
  const auth = useAuth();

  return (
    <div>
      <p>Username: {auth?.user?.username}</p>
      <p>Your identification number: {auth?.user?.id}</p>
      <p>Your email: {auth?.user?.email}</p>
    </div>
  )
}

export default UserProfile
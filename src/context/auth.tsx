import React, { createContext, useContext, useState } from "react";
import { userInterface, AuthContextInterface } from "../types/userType";

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState<userInterface | null>(null);

  const login = (userInfo: userInterface) => {
    setUser(userInfo);
    localStorage.setItem('username', userInfo.username);
    localStorage.setItem('id', String(userInfo.id));
    localStorage.setItem('email', userInfo.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

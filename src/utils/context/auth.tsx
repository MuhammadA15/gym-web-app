import React, { createContext, useContext, useState } from "react";

interface AuthContextInterface {
  user: any;
  login: (username: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState(null);

  const login = (username: any) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
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

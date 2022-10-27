import React, { createContext, useContext, useState } from "react";

interface userInterface {
  id: number,
  email: string,
  username: string,
  password: string
}

interface AuthContextInterface {
  user: userInterface | null;
  login: (userInfo: userInterface) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState<userInterface | null>(null);

  const login = (userInfo: userInterface) => {
    setUser(userInfo);
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

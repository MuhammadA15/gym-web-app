export interface userInterface {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface AuthContextInterface {
  user: userInterface | null;
  login: (userInfo: userInterface) => void;
  logout: () => void;
}

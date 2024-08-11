import { createContext } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  logout: () => void;
  user: { firstName: string; lastName: string } | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;

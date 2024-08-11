import { LOGIN, LoginResponse, LoginVariables } from '@/api';
import { RoutePath } from '@/assets';
import AuthContext from '@/context/AuthContext';
import { useMutation } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [login] = useMutation<LoginResponse, LoginVariables>(LOGIN);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const loginHandler = async (email: string, password: string) => {
    try {
      setLoading(true);
      const data = await login({ variables: { email, password } });
      const user = data?.data?.login.organizations[0].users[0];
      setUser({
        firstName: user?.name ?? '',
        lastName: user?.surname ?? '',
      });
      setIsAuthenticated(true);
      data.data?.login.token &&
        localStorage.setItem('a-core-token', data.data?.login.token);
      navigate(from ?? RoutePath.main, { replace: true });
    } catch (error) {
      console.log(error);
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('a-core-token');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (isAuthenticated === undefined) {
      const token = localStorage.getItem('a-core-token');
      setIsAuthenticated(!!token);
    }
  }, [isAuthenticated]);

  return isAuthenticated === undefined ? null : (
    <AuthContext.Provider
      value={{ isAuthenticated, login: loginHandler, logout, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

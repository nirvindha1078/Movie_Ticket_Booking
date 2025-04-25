import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useUserContext } from '../User/UserContext';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userId: string, role: string) => void;
  logout: () => void;
  role: string | null;  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const { fetchUserData } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setRole('User'); 
      fetchUserData(localStorage.getItem('userId') || '');
    } else if (adminToken) {
      setIsAuthenticated(true);
      setRole('Admin'); 
    }
  }, []);

  const login = (token: string, userId: string, role: string) => {
    if (role === 'Admin') {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminId', userId);
      setRole('Admin'); 
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setRole('User'); 
    }
    setIsAuthenticated(true); 
    fetchUserData(userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    setIsAuthenticated(false); 
    setRole(null); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };

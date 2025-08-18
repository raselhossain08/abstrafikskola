'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user' | 'instructor';
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; message?: string }>;
  updateUser: (
    userData: Partial<User>
  ) => Promise<{ success: boolean; message?: string }>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface AuthProviderProps {
  children: ReactNode;
}

// Cookie utility functions for auth tokens
const getAuthCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const setAuthCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;HttpOnly=false;SameSite=Lax;Secure=${location.protocol === 'https:'}`;
};

const removeAuthCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = getAuthCookie('auth_token');
        if (token) {
          // Validate token with backend
          const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            // Token is invalid, remove it
            removeAuthCookie('auth_token');
            removeAuthCookie('refresh_token');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        removeAuthCookie('auth_token');
        removeAuthCookie('refresh_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setAuthCookie('auth_token', data.token, 7); // 7 days
        if (data.refreshToken) {
          setAuthCookie('refresh_token', data.refreshToken, 30); // 30 days
        }
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: RegisterData
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setAuthCookie('auth_token', data.token, 7);
        if (data.refreshToken) {
          setAuthCookie('refresh_token', data.refreshToken, 30);
        }
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || 'Registration failed',
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (
    userData: Partial<User>
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = getAuthCookie('auth_token');
      if (!token) {
        return { success: false, message: 'Not authenticated' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/update`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser((prevUser) =>
          prevUser ? { ...prevUser, ...data.user } : data.user
        );
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Update failed' };
      }
    } catch (error) {
      console.error('Update error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthCookie('auth_token');
    removeAuthCookie('refresh_token');

    // Optional: Call logout endpoint to invalidate server-side session
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

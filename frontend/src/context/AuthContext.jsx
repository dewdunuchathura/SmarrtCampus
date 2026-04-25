import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config/api';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'fms_auth_user';

function mergeUserData(storedUser, googleUser) {
  if (!storedUser && !googleUser) {
    return null;
  }

  return {
    ...storedUser,
    name: storedUser?.name || googleUser?.name || '',
    email: storedUser?.email || googleUser?.email || '',
    role: storedUser?.role || 'USER',
    provider: storedUser?.provider || 'GOOGLE',
    picture: googleUser?.picture || storedUser?.picture || '',
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch {
      return null;
    }
  });

  const refreshUser = async () => {
    try {
      const authRes = await axios.get(`${BACKEND_URL}/api/auth/google-user`, {
        withCredentials: true,
      });

      const googleUser = authRes.data?.data;
      const googleEmail = googleUser?.email?.trim()?.toLowerCase();

      if (!googleEmail) {
        return;
      }

      const userRes = await axios.get(`${BACKEND_URL}/api/auth/me`, {
        params: { email: googleEmail },
        withCredentials: true,
      });

      setUser(mergeUserData(userRes.data?.data, googleUser));
    } catch {
      setUser((current) => current ?? null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors and continue with in-memory auth state.
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage errors during logout.
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${BACKEND_URL}/logout`;
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export default AuthContext;

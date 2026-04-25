import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const BACKEND_URL = 'http://localhost:8080';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const refreshUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/auth/google-user`, {
        withCredentials: true,
      });

      const googleUser = res.data?.attributes;
      const googleEmail = googleUser?.email;

      if (!googleEmail) {
        setUser((current) => current ?? null);
        return;
      }

      const userRes = await axios.get(
        `${BACKEND_URL}/api/auth/me?email=${googleEmail}`,
        { withCredentials: true }
      );

      const storedUser = userRes.data?.data;

      setUser({
        ...storedUser,
        name: storedUser?.name || googleUser?.name,
        email: storedUser?.email || googleUser?.email,
        picture: googleUser?.picture || '',
      });
    } catch {
      setUser((current) => current ?? null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = async () => {
    setUser(null);

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

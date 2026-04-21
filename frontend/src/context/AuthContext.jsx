import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const BACKEND_URL = 'http://localhost:8080';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/auth/google-user`, {
        withCredentials: true,
      })
      .then((res) => {
        const googleUser = res.data.attributes;

        return axios.get(
          `${BACKEND_URL}/api/auth/me?email=${googleUser.email}`,
          { withCredentials: true }
        ).then((userRes) => ({
          googleUser,
          storedUser: userRes.data.data,
        }));
      })
      .then(({ googleUser, storedUser }) => {
        setUser({
          ...storedUser,
          name: storedUser?.name || googleUser?.name,
          email: storedUser?.email || googleUser?.email,
          picture: googleUser?.picture || '',
        });
      })
      .catch(() => {
        setUser(null);
      });
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
    <AuthContext.Provider value={{ user, setUser, logout }}>
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

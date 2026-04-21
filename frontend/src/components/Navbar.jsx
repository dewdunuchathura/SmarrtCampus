import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <Link to="/resources">Resources</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/tickets">Tickets</Link>
      <Link to="/login">Auth</Link>

      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={user.picture}
              alt="profile"
              width="30"
              style={{ borderRadius: '50%' }}
            />
            <span>{user.name}</span>
            <button type="button">Logout</button>
          </div>
        ) : (
          <button type="button">Login</button>
        )}
      </div>
    </nav>
  );
}
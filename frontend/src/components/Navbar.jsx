import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="app-nav">
      <Link className="app-nav-logo" to="/">
        <span className="app-nav-mark" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="1.5" width="4" height="4" rx="1.2" fill="white" />
            <rect x="8.5" y="1.5" width="4" height="4" rx="1.2" fill="white" opacity="0.75" />
            <rect x="1.5" y="8.5" width="4" height="4" rx="1.2" fill="white" opacity="0.75" />
            <rect x="8.5" y="8.5" width="4" height="4" rx="1.2" fill="white" opacity="0.5" />
          </svg>
        </span>
        FMS
      </Link>

      <div className="app-nav-links">
        <Link className="app-nav-link" to="/resources">Resources</Link>
        <Link className="app-nav-link" to="/bookings">Bookings</Link>
        <Link className="app-nav-link" to="/bookings/admin">Bookings Admin</Link>
        <Link className="app-nav-link" to="/tickets">Tickets</Link>
        <Link className="app-nav-link" to="/login">Auth</Link>
      </div>

      <div className="app-nav-right">
        {user ? (
          <button type="button" className="app-btn-ghost">Logout</button>
        ) : (
          <>
            <Link className="app-btn-ghost" to="/login">Login</Link>
            <Link className="app-btn-primary" to="/login">Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

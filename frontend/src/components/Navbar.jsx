import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="nav">
      {/* Logo Section */}
      <div className="nav-logo">
        <span className="logo-mark" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1.2" fill="white" />
            <rect x="9" y="2" width="5" height="5" rx="1.2" fill="white" opacity="0.8" />
            <rect x="2" y="9" width="5" height="5" rx="1.2" fill="white" opacity="0.8" />
            <rect x="9" y="9" width="5" height="5" rx="1.2" fill="white" opacity="0.6" />
          </svg>
        </span>
        FMS
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link className="nav-link" to="/resources">Resources</Link>
        <Link className="nav-link" to="/bookings">Bookings</Link>
        <Link className="nav-link" to="/tickets">Tickets</Link>
      </div>

      {/* Right Section - User Actions */}
      <div className="nav-right">
        {user ? (
          <>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#1d9e75',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <button className="btn-ghost">Logout</button>
          </>
        ) : (
          <>
            <button className="btn-ghost">Login</button>
            <button className="btn-primary">Get started</button>
          </>
        )}
      </div>
    </nav>
  );
}

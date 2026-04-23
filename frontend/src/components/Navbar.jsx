import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem', 
      padding: '1rem', 
      borderBottom: '1px solid #ddd' 
    }}>
      <Link to="/resources" style={{ 
        textDecoration: 'none', 
        color: '#333', 
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
      }}>Resources</Link>
      <Link to="/bookings" style={{ 
        textDecoration: 'none', 
        color: '#333', 
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
      }}>Bookings</Link>
      <Link to="/tickets/index" style={{ 
        textDecoration: 'none', 
        color: '#333', 
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
      }}>Tickets</Link>
      <Link to="/notifications" style={{ 
        textDecoration: 'none', 
        color: '#333', 
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
      }}>Notifications</Link>
      <div style={{ marginLeft: 'auto' }}>
        <button 
          type="button"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
}

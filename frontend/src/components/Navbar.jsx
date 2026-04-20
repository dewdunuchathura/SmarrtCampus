import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <Link to="/resources">Resources</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/tickets">Tickets</Link>
    </nav>
  );
}

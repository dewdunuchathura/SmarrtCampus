import { useNavigate } from 'react-router-dom';

export default function TicketsPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: 'Manrope, sans-serif',
      backgroundColor: '#F5F7FA',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        padding: '2rem'
      }}>
        <h1 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#0F172A',
          margin: '0 0 1.5rem 0',
          textAlign: 'center'
        }}>
          Tickets Module
        </h1>
        
        <p style={{
          color: '#64748B',
          fontSize: '1rem',
          margin: '0 0 2rem 0',
          textAlign: 'center'
        }}>
          Manage maintenance tickets, track issues, and monitor resolutions
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => navigate('/tickets')}
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'Manrope, sans-serif',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            View All Tickets
          </button>

          <button
            onClick={() => navigate('/tickets/createticket')}
            style={{
              backgroundColor: '#D97706',
              color: '#FFFFFF',
              border: 'none',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'Manrope, sans-serif',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Create New Ticket
          </button>
        </div>

        <div style={{
          backgroundColor: '#EEF2F7',
          padding: '1.5rem',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontFamily: 'Sora, sans-serif',
            color: '#0F172A',
            margin: '0 0 1rem 0'
          }}>
            Quick Actions
          </h3>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/tickets')}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#475569',
                border: '1px solid #E3E8EF',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer'
              }}
            >
              📋 View Tickets
            </button>
            <button
              onClick={() => navigate('/tickets/createticket')}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#475569',
                border: '1px solid #E3E8EF',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer'
              }}
            >
              ➕ Create Ticket
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#475569',
                border: '1px solid #E3E8EF',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer'
              }}
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

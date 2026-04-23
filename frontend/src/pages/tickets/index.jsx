import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TicketsPage() {
  const navigate = useNavigate();
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{
      fontFamily: 'Manrope, sans-serif',
      backgroundColor: '#F5F7FA',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '3rem',
          fontWeight: '800',
          color: '#0F172A',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎫 Ticket Center
        </h1>
        
        <p style={{
          color: '#64748B',
          fontSize: '1.25rem',
          margin: '0 0 2rem 0',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Create, track, and manage your support tickets with ease
        </p>
      </div>

      {/* Main Options Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Create Ticket Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E3E8EF',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
        }}
        onClick={() => navigate('/tickets/createticket')}
        >
          <div style={{
            backgroundColor: '#FEF3C7',
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>➕</span>
          </div>
          
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0F172A',
            margin: '0 0 1rem 0'
          }}>
            Create New Ticket
          </h2>
          
          <p style={{
            color: '#64748B',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: '0 0 1.5rem 0'
          }}>
            Submit a new support request for maintenance, IT issues, or any facility-related concerns
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#D97706',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            <span>Get Started →</span>
          </div>
        </div>

        {/* View Workflow Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E3E8EF',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
        }}
        onClick={() => navigate('/tickets')}
        >
          <div style={{
            backgroundColor: '#DBEAFE',
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📋</span>
          </div>
          
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0F172A',
            margin: '0 0 1rem 0'
          }}>
            View Ticket Workflow
          </h2>
          
          <p style={{
            color: '#64748B',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: '0 0 1.5rem 0'
          }}>
            Track the progress of your tickets, view status updates, and monitor resolution timelines
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#2563EB',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            <span>View Progress →</span>
          </div>
        </div>

        {/* Raise Ticket Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E3E8EF',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
        }}
        onClick={() => navigate('/tickets/createticket')}
        >
          <div style={{
            backgroundColor: '#D1FAE5',
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🚨</span>
          </div>
          
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0F172A',
            margin: '0 0 1rem 0'
          }}>
            Raise Urgent Ticket
          </h2>
          
          <p style={{
            color: '#64748B',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: '0 0 1.5rem 0'
          }}>
            For urgent issues requiring immediate attention - get priority support and faster resolution
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#059669',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            <span>Raise Ticket →</span>
          </div>
        </div>

        {/* My Tickets Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E3E8EF',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
        }}
        onClick={() => navigate('/tickets')}
        >
          <div style={{
            backgroundColor: '#F3E8FF',
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📂</span>
          </div>
          
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#0F172A',
            margin: '0 0 1rem 0'
          }}>
            My Tickets
          </h2>
          
          <p style={{
            color: '#64748B',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: '0 0 1.5rem 0'
          }}>
            View all your submitted tickets, check their status, and see your ticket history
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#7C3AED',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            <span>My Tickets →</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '3rem auto 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #E3E8EF'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2563EB',
            fontFamily: 'Sora, sans-serif'
          }}>
            {userTickets.length}
          </div>
          <div style={{
            color: '#64748B',
            fontSize: '0.875rem',
            fontFamily: 'Manrope, sans-serif'
          }}>
            Total Tickets
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #E3E8EF'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#D97706',
            fontFamily: 'Sora, sans-serif'
          }}>
            0
          </div>
          <div style={{
            color: '#64748B',
            fontSize: '0.875rem',
            fontFamily: 'Manrope, sans-serif'
          }}>
            Pending
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #E3E8EF'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#059669',
            fontFamily: 'Sora, sans-serif'
          }}>
            0
          </div>
          <div style={{
            color: '#64748B',
            fontSize: '0.875rem',
            fontFamily: 'Manrope, sans-serif'
          }}>
            Resolved
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #E3E8EF'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#DC2626',
            fontFamily: 'Sora, sans-serif'
          }}>
            0
          </div>
          <div style={{
            color: '#64748B',
            fontSize: '0.875rem',
            fontFamily: 'Manrope, sans-serif'
          }}>
            Urgent
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '3rem auto 0',
        backgroundColor: '#F8FAFC',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #E3E8EF',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#0F172A',
          margin: '0 0 1rem 0'
        }}>
          Need Help?
        </h3>
        <p style={{
          color: '#64748B',
          fontSize: '0.95rem',
          margin: '0 0 1.5rem 0'
        }}>
          Our support team is here to help you with any questions or issues you may have.
        </p>
        <button
          style={{
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            fontFamily: 'Manrope, sans-serif',
            cursor: 'pointer'
          }}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function TicketsPage() {
  const navigate = useNavigate();
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMyTickets, setShowMyTickets] = useState(false);

  // Mock current user - in real app, this would come from auth context
  const currentUser = { email: 'user@example.com', name: 'John User' };

  useEffect(() => {
    fetchUserTickets();
  }, []);

  const fetchUserTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/tickets');
      if (response.data.success) {
        // Filter tickets submitted by current user
        const myTickets = response.data.data.filter(
          ticket => ticket.submittedBy === currentUser.email
        );
        setUserTickets(myTickets);
      }
    } catch (err) {
      console.error('Error fetching user tickets:', err);
    } finally {
      setLoading(false);
    }
  };

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
        onClick={() => setShowMyTickets(true)}
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

      {/* My Tickets Table Section */}
      {showMyTickets && (
        <div style={{
          maxWidth: '1200px',
          margin: '2rem auto 0',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E3E8EF'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#0F172A',
              margin: 0
            }}>
              📂 My Tickets
            </h3>
            <button
              onClick={() => setShowMyTickets(false)}
              style={{
                backgroundColor: '#F3F4F6',
                color: '#64748B',
                border: '1px solid #E3E8EF',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer'
              }}
            >
              ✕ Close
            </button>
          </div>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#64748B'
            }}>
              Loading your tickets...
            </div>
          ) : userTickets.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#64748B'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                No tickets found
              </p>
              <p style={{ fontSize: '0.875rem' }}>
                You haven't submitted any tickets yet. Click "Create New Ticket" to get started.
              </p>
            </div>
          ) : (
            <div style={{
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.875rem'
              }}>
                <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E3E8EF' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>Title</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>Category</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>Priority</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>Location</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>Created</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontWeight: '600', fontFamily: 'Sora, sans-serif' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userTickets.map((ticket) => (
                    <tr key={ticket.id} style={{
                      borderBottom: '1px solid #E3E8EF',
                      '&:hover': { backgroundColor: '#F8FAFC' }
                    }}>
                      <td style={{ padding: '1rem', color: '#475569' }}>
                        {ticket.ticketId || ticket.id?.substring(0, 8) + '...'}
                      </td>
                      <td style={{ padding: '1rem', color: '#0F172A', fontWeight: '500' }}>
                        {ticket.title}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          backgroundColor: '#EEF2F7',
                          color: '#475569',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {ticket.category}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          backgroundColor: ticket.priority === 'URGENT' ? '#FEE2E2' : 
                                         ticket.priority === 'HIGH' ? '#FED7AA' :
                                         ticket.priority === 'MEDIUM' ? '#FEF3C7' : '#D1FAE5',
                          color: ticket.priority === 'URGENT' ? '#DC2626' : 
                                 ticket.priority === 'HIGH' ? '#EA580C' :
                                 ticket.priority === 'MEDIUM' ? '#D97706' : '#059669',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          backgroundColor: ticket.status === 'OPEN' ? '#FEF3C7' :
                                         ticket.status === 'IN_PROGRESS' ? '#DBEAFE' :
                                         ticket.status === 'RESOLVED' ? '#D1FAE5' : '#F3F4F6',
                          color: ticket.status === 'OPEN' ? '#D97706' :
                                 ticket.status === 'IN_PROGRESS' ? '#2563EB' :
                                 ticket.status === 'RESOLVED' ? '#059669' : '#64748B',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {ticket.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#475569' }}>
                        {ticket.location}
                      </td>
                      <td style={{ padding: '1rem', color: '#475569' }}>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => navigate(`/tickets/${ticket.id}`)}
                          style={{
                            backgroundColor: '#2563EB',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

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

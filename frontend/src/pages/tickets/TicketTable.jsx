import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function TicketTable() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [technicianEmail, setTechnicianEmail] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    let filtered = tickets;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus) {
      filtered = filtered.filter(ticket => ticket.status === filterStatus);
    }

    // Filter by priority
    if (filterPriority) {
      filtered = filtered.filter(ticket => ticket.priority === filterPriority);
    }

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter(ticket => ticket.category === filterCategory);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, filterStatus, filterPriority, filterCategory]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/tickets');
      if (response.data.success) {
        setTickets(response.data.data);
        setFilteredTickets(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        const response = await axios.delete(`/tickets/${ticketId}`);
        if (response.data.success) {
          fetchTickets();
        }
      } catch (err) {
        console.error('Error deleting ticket:', err);
        setError('Failed to delete ticket');
      }
    }
  };

  const handleAssignTicket = async () => {
    if (!technicianEmail.trim()) {
      alert('Please enter a technician email');
      return;
    }

    try {
      const response = await axios.put(`/tickets/${selectedTicket.id}/assign`, technicianEmail);
      if (response.data.success) {
        fetchTickets();
        setShowAssignModal(false);
        setTechnicianEmail('');
        setSelectedTicket(null);
      }
    } catch (err) {
      console.error('Error assigning ticket:', err);
      setError('Failed to assign ticket');
    }
  };

  const handleResolveTicket = async () => {
    if (!resolutionNotes.trim()) {
      alert('Please enter resolution notes');
      return;
    }

    try {
      const response = await axios.put(`/tickets/${selectedTicket.id}/resolve`, resolutionNotes);
      if (response.data.success) {
        fetchTickets();
        setShowResolveModal(false);
        setResolutionNotes('');
        setSelectedTicket(null);
      }
    } catch (err) {
      console.error('Error resolving ticket:', err);
      setError('Failed to resolve ticket');
    }
  };

  const handleRejectTicket = async () => {
    if (!rejectionReason.trim()) {
      alert('Please enter a rejection reason');
      return;
    }

    try {
      const response = await axios.put(`/tickets/${selectedTicket.id}/reject`, rejectionReason);
      if (response.data.success) {
        fetchTickets();
        setShowRejectModal(false);
        setRejectionReason('');
        setSelectedTicket(null);
      }
    } catch (err) {
      console.error('Error rejecting ticket:', err);
      setError('Failed to reject ticket');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return '#DC2626';
      case 'HIGH': return '#D97706';
      case 'MEDIUM': return '#2563EB';
      case 'LOW': return '#64748B';
      default: return '#64748B';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return '#DC2626';
      case 'IN_PROGRESS': return '#D97706';
      case 'RESOLVED': return '#10B981';
      case 'CLOSED': return '#64748B';
      case 'REJECTED': return '#7C3AED';
      default: return '#64748B';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div style={{
        fontFamily: 'Manrope, sans-serif',
        backgroundColor: '#F5F7FA',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ color: '#64748B' }}>Loading tickets...</div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Manrope, sans-serif',
      backgroundColor: '#F5F7FA',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <div>
              <h1 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '2rem',
                fontWeight: '700',
                color: '#0F172A',
                margin: '0 0 0.5rem 0'
              }}>
                Support Tickets
              </h1>
              <p style={{
                color: '#64748B',
                fontSize: '1rem',
                margin: '0 0 1rem 0'
              }}>
                Total: {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} | Showing: {filteredTickets.length}
              </p>
            </div>
            
            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}>
              <button
                onClick={() => navigate('/tickets/createticket')}
                style={{
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                ➕ Create New Ticket
              </button>
              
              <button
                onClick={() => navigate('/tickets/technician')}
                style={{
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                👨‍🔧 Technician Panel
              </button>
              
              <button
                onClick={() => navigate('/tickets/admin')}
                style={{
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                🎛️ Admin Dashboard
              </button>
              
              <button
                onClick={() => navigate('/tickets/index')}
                style={{
                  backgroundColor: '#64748B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                🏠 Tickets Home
              </button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #E3E8EF',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
              gap: '1rem',
              alignItems: 'end'
            }}>
              {/* Search */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '600',
                  color: '#0F172A',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tickets..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #E3E8EF',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'Manrope, sans-serif',
                    backgroundColor: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Status Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '600',
                  color: '#0F172A',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #E3E8EF',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'Manrope, sans-serif',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="">All Status</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '600',
                  color: '#0F172A',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Priority
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #E3E8EF',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'Manrope, sans-serif',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="">All Priority</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: '600',
                  color: '#0F172A',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #E3E8EF',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'Manrope, sans-serif',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="">All Categories</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Security">Security</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('');
                    setFilterPriority('');
                    setFilterCategory('');
                  }}
                  style={{
                    backgroundColor: '#EEF2F7',
                    color: '#64748B',
                    border: '1px solid #E3E8EF',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    fontFamily: 'Manrope, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #FCA5A5'
          }}>
            {error}
          </div>
        )}

        {/* Tickets Table */}
        {filteredTickets.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              ð
            </div>
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#0F172A',
              margin: '0 0 0.5rem 0'
            }}>
              No tickets found
            </h3>
            <p style={{
              color: '#64748B',
              margin: '0 0 1.5rem 0'
            }}>
              Create your first support ticket to get started
            </p>
            <button
              onClick={() => window.location.href = '/tickets/create'}
              style={{
                backgroundColor: '#D97706',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer'
              }}
            >
              Create Ticket
            </button>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            border: '1px solid #E3E8EF'
          }}>
            {/* Table Header */}
            <div style={{
              backgroundColor: '#F8FAFC',
              padding: '1rem 1.5rem',
              borderBottom: '2px solid #E3E8EF',
              fontFamily: 'Sora, sans-serif',
              fontWeight: '600',
              color: '#0F172A',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div>Title</div>
                <div>Category</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Submitted By</div>
                <div>Location</div>
                <div>Assigned To</div>
                <div>Actions</div>
              </div>
            </div>

            {/* Table Rows */}
            <div>
              {filteredTickets.map((ticket, index) => (
                <div
                  key={ticket.id}
                  style={{
                    padding: '1rem 1.5rem',
                    borderBottom: index === filteredTickets.length - 1 ? 'none' : '1px solid #EEF2F7',
                    transition: 'background-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    {/* Title */}
                    <div>
                      <div style={{
                        fontFamily: 'Sora, sans-serif',
                        fontWeight: '600',
                        color: '#0F172A',
                        marginBottom: '0.25rem',
                        fontSize: '0.95rem'
                      }}>
                        {ticket.title}
                      </div>
                      <div style={{
                        color: '#64748B',
                        fontSize: '0.75rem',
                        fontFamily: 'Manrope, sans-serif'
                      }}>
                        {formatDate(ticket.createdAt)}
                      </div>
                    </div>

                    {/* Category */}
                    <div style={{
                      color: '#475569',
                      fontSize: '0.875rem',
                      fontFamily: 'Manrope, sans-serif'
                    }}>
                      {ticket.category}
                    </div>

                    {/* Priority */}
                    <div>
                      <span style={{
                        backgroundColor: getPriorityColor(ticket.priority),
                        color: '#FFFFFF',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        fontFamily: 'Sora, sans-serif',
                        display: 'inline-block'
                      }}>
                        {ticket.priority}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <span style={{
                        backgroundColor: getStatusColor(ticket.status),
                        color: '#FFFFFF',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        fontFamily: 'Sora, sans-serif',
                        display: 'inline-block'
                      }}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Submitted By */}
                    <div style={{
                      color: '#475569',
                      fontSize: '0.875rem',
                      fontFamily: 'Manrope, sans-serif'
                    }}>
                      {ticket.submittedBy}
                    </div>

                    {/* Location */}
                    <div style={{
                      color: '#475569',
                      fontSize: '0.875rem',
                      fontFamily: 'Manrope, sans-serif'
                    }}>
                      {ticket.location}
                    </div>

                    {/* Assigned To */}
                    <div style={{
                      color: ticket.assignedTo ? '#475569' : '#94A3B8',
                      fontSize: '0.875rem',
                      fontFamily: 'Manrope, sans-serif'
                    }}>
                      {ticket.assignedTo || 'Unassigned'}
                    </div>

                    {/* Actions */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                        style={{
                          backgroundColor: '#EEF2F7',
                          color: '#059669',
                          border: '1px solid #E3E8EF',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          fontFamily: 'Manrope, sans-serif',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#059669';
                          e.target.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#EEF2F7';
                          e.target.style.color = '#059669';
                        }}
                      >
                        Details
                      </button>
                      
                      <button
                        onClick={() => window.location.href = `/tickets/edit/${ticket.id}`}
                        style={{
                          backgroundColor: '#EEF2F7',
                          color: '#2563EB',
                          border: '1px solid #E3E8EF',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          fontFamily: 'Manrope, sans-serif',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#2563EB';
                          e.target.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#EEF2F7';
                          e.target.style.color = '#2563EB';
                        }}
                      >
                        Edit
                      </button>
                      
                      {ticket.status === 'OPEN' && (
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowAssignModal(true);
                          }}
                          style={{
                            backgroundColor: '#EEF2F7',
                            color: '#D97706',
                            border: '1px solid #E3E8EF',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            fontFamily: 'Manrope, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#D97706';
                            e.target.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#EEF2F7';
                            e.target.style.color = '#D97706';
                          }}
                        >
                          Assign
                        </button>
                      )}
                      
                      {ticket.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowResolveModal(true);
                          }}
                          style={{
                            backgroundColor: '#EEF2F7',
                            color: '#10B981',
                            border: '1px solid #E3E8EF',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            fontFamily: 'Manrope, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#10B981';
                            e.target.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#EEF2F7';
                            e.target.style.color = '#10B981';
                          }}
                        >
                          Resolve
                        </button>
                      )}
                      
                      {(ticket.status === 'OPEN' || ticket.status === 'IN_PROGRESS') && (
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowRejectModal(true);
                          }}
                          style={{
                            backgroundColor: '#EEF2F7',
                            color: '#7C3AED',
                            border: '1px solid #E3E8EF',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            fontFamily: 'Manrope, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#7C3AED';
                            e.target.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#EEF2F7';
                            e.target.style.color = '#7C3AED';
                          }}
                        >
                          Reject
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteTicket(ticket.id)}
                        style={{
                          backgroundColor: '#EEF2F7',
                          color: '#DC2626',
                          border: '1px solid #E3E8EF',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          fontFamily: 'Manrope, sans-serif',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#DC2626';
                          e.target.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#EEF2F7';
                          e.target.style.color = '#DC2626';
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {showAssignModal && selectedTicket && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#0F172A',
              margin: '0 0 1rem 0'
            }}>
              Assign Ticket
            </h2>
            <p style={{
              color: '#64748B',
              margin: '0 0 1.5rem 0'
            }}>
              Assign ticket "{selectedTicket.title}" to a technician
            </p>
            <input
              type="email"
              value={technicianEmail}
              onChange={(e) => setTechnicianEmail(e.target.value)}
              placeholder="technician@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #E3E8EF',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'Manrope, sans-serif',
                marginBottom: '1.5rem',
                outline: 'none'
              }}
            />
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setTechnicianEmail('');
                  setSelectedTicket(null);
                }}
                style={{
                  backgroundColor: '#EEF2F7',
                  color: '#64748B',
                  border: '1px solid #E3E8EF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAssignTicket}
                style={{
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer'
                }}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {showResolveModal && selectedTicket && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#0F172A',
              margin: '0 0 1rem 0'
            }}>
              Resolve Ticket
            </h2>
            <p style={{
              color: '#64748B',
              margin: '0 0 1.5rem 0'
            }}>
              Mark ticket "{selectedTicket.title}" as resolved
            </p>
            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Enter resolution notes..."
              rows="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #E3E8EF',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'Manrope, sans-serif',
                marginBottom: '1.5rem',
                resize: 'vertical',
                outline: 'none'
              }}
            />
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowResolveModal(false);
                  setResolutionNotes('');
                  setSelectedTicket(null);
                }}
                style={{
                  backgroundColor: '#EEF2F7',
                  color: '#64748B',
                  border: '1px solid #E3E8EF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleResolveTicket}
                style={{
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer'
                }}
              >
                Resolve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedTicket && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#0F172A',
              margin: '0 0 1rem 0'
            }}>
              Reject Ticket
            </h2>
            <p style={{
              color: '#64748B',
              margin: '0 0 1.5rem 0'
            }}>
              Reject ticket "{selectedTicket.title}" and provide a reason
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #E3E8EF',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'Manrope, sans-serif',
                marginBottom: '1.5rem',
                resize: 'vertical',
                outline: 'none'
              }}
            />
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedTicket(null);
                }}
                style={{
                  backgroundColor: '#EEF2F7',
                  color: '#64748B',
                  border: '1px solid #E3E8EF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRejectTicket}
                style={{
                  backgroundColor: '#7C3AED',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer'
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

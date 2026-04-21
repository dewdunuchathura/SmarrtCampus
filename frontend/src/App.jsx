import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import ResourcesPage from './pages/resources';
import BookingsPage from './pages/bookings';
import TicketsPage from './pages/tickets';
import CreateTicket from './pages/tickets/CreateTicket';
import EditTicket from './pages/tickets/EditTicket';
import TicketTable from './pages/tickets/TicketTable';
import LoginPage from './pages/auth';
import NotificationsPage from './pages/notifications';

function Shell() {
  const location = useLocation();
  const showSharedNavbar = location.pathname !== '/';

  return (
    <div style={{
      fontFamily: 'Manrope, sans-serif',
      backgroundColor: '#F5F7FA',
      minHeight: '100vh',
      color: '#0F172A',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {showSharedNavbar ? (
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E3E8EF'
        }}>
          <Navbar />
        </header>
      ) : null}
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Manrope, sans-serif',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            border: '1px solid #E3E8EF',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            fontSize: '0.875rem',
            maxWidth: '400px'
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF'
            },
            style: {
              borderLeft: '4px solid #10B981'
            }
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF'
            },
            style: {
              borderLeft: '4px solid #EF4444'
            }
          },
          loading: {
            iconTheme: {
              primary: '#D97706',
              secondary: '#FFFFFF'
            }
          }
        }}
      />
      
      <main style={{
        flex: 1,
        width: '100%',
        ...(showSharedNavbar ? { 
          paddingTop: '0',
          backgroundColor: '#F5F7FA'
        } : {
          backgroundColor: '#F5F7FA'
        })
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/tickets" element={<TicketTable />} />
          <Route path="/tickets/create" element={<CreateTicket />} />
          <Route path="/tickets/edit/:id" element={<EditTicket />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {showSharedNavbar && (
        <footer style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E3E8EF',
          padding: '1rem 2rem',
          textAlign: 'center',
          color: '#64748B',
          fontSize: '0.875rem',
          fontFamily: 'Manrope, sans-serif'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            © 2024 Smart Campus Facility Management System. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <AuthProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { approveBooking, getBookings, rejectBooking } from '../../api/bookings';
import './bookings.css';

const statusOrder = ['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];

function formatBookingTime(value) {
  if (!value) return 'N/A';
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

function statusClass(status) {
  return String(status || '').toLowerCase();
}

export default function BookingAdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedBy, setApprovedBy] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [errorBanner, setErrorBanner] = useState('');
  const [successBanner, setSuccessBanner] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setLoading(true);
      const { data } = await getBookings();
      setBookings(data?.data ?? []);
      setErrorBanner('');
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to load bookings.';
      setErrorBanner(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus = selectedStatus === 'ALL' || booking.status === selectedStatus;
      const query = search.trim().toLowerCase();
      const haystack = [
        booking.id,
        booking.resourceId,
        booking.resourceName,
        booking.requestedBy,
        booking.purpose,
        booking.status
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesStatus && (!query || haystack.includes(query));
    });
  }, [bookings, selectedStatus, search]);

  async function handleApprove(id) {
    if (!approvedBy.trim()) {
      const message = 'Please enter approved by before approving.';
      setErrorBanner(message);
      toast.error(message);
      return;
    }

    try {
      await approveBooking(id, approvedBy.trim());
      toast.success('Booking approved.');
      setSuccessBanner('Booking approved.');
      await loadBookings();
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to approve booking.';
      setErrorBanner(message);
      toast.error(message);
    }
  }

  async function handleReject(id) {
    try {
      await rejectBooking(id, rejectionReason.trim());
      toast.success('Booking rejected.');
      setSuccessBanner('Booking rejected.');
      await loadBookings();
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to reject booking.';
      setErrorBanner(message);
      toast.error(message);
    }
  }

  return (
    <div className="bookings-page">
      <div className="bookings-shell">
        <section className="bookings-hero">
          <div className="hero-panel">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Admin booking page
            </div>
            <h1>Review pending bookings and make approval decisions.</h1>
            <p className="hero-copy">
              This page is reserved for booking approval and rejection. It uses the same backend
              endpoints, but keeps admin actions separated from the user booking flow.
            </p>
          </div>

          <aside className="side-panel">
            <div>
              <div className="side-title">Admin tools</div>
              <div className="side-text">
                Enter the approver name once, then use the approve or reject buttons on pending
                bookings.
              </div>
            </div>
            <div className="mini-grid">
              <div className="mini-card">
                <h3>Admin fields</h3>
                <p>Approved by and rejection reason are entered here, not on the user page.</p>
              </div>
            </div>
          </aside>
        </section>

        {errorBanner ? <div className="banner error">{errorBanner}</div> : null}
        {successBanner ? <div className="banner success">{successBanner}</div> : null}

        <section className="toolbar">
          <div className="form-card">
            <div className="section-title">Decision inputs</div>
            <div className="section-subtitle">
              These values are reused while approving or rejecting pending bookings.
            </div>

            <div className="grid-form">
              <div className="field full">
                <label htmlFor="approvedBy">Approved by</label>
                <input
                  id="approvedBy"
                  value={approvedBy}
                  onChange={(event) => setApprovedBy(event.target.value)}
                  placeholder="admin1"
                />
              </div>
              <div className="field full">
                <label htmlFor="rejectionReason">Rejection reason</label>
                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(event) => setRejectionReason(event.target.value)}
                  placeholder="Reason for rejection..."
                />
              </div>
            </div>
          </div>

          <div className="filter-card">
            <div className="section-title">Decision rules</div>
            <div className="section-subtitle">
              Only pending bookings should be acted on from this page. Approved, rejected, and
              cancelled bookings remain visible for history.
            </div>
            <div className="mini-grid">
              <div className="mini-card">
                <h3>Rule 1</h3>
                <p>Approve only when the resource is still available for the time slot.</p>
              </div>
              <div className="mini-card">
                <h3>Rule 2</h3>
                <p>Reject with a short reason so the requester can understand what happened.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="table-card">
          <div className="controls">
            <div className="search">
              <input
                type="search"
                placeholder="Search by resource, user, purpose, or booking id"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="filter-chips">
              {statusOrder.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`chip ${selectedStatus === status ? 'active' : ''}`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status === 'ALL' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>

          <div className="section-title">All bookings</div>
          <div className="section-subtitle">
            Approve or reject pending bookings from this page.
          </div>

          {loading ? (
            <div className="empty-state">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="empty-state">
              No bookings match the current filter. Adjust the search or status filter.
            </div>
          ) : (
            <div className="booking-grid">
              {filteredBookings.map((booking) => {
                const editable = booking.status === 'PENDING';

                return (
                  <article className="booking-card" key={booking.id}>
                    <div className="booking-main">
                      <div className="booking-head">
                        <div>
                          <div className="booking-title">{booking.resourceName || booking.resourceId}</div>
                          <div className="booking-meta">Booking ID: {booking.id}</div>
                        </div>
                        <span className={`status ${statusClass(booking.status)}`}>
                          <span className="status-dot" />
                          {booking.status}
                        </span>
                      </div>

                      <div className="booking-meta">
                        <strong>Resource:</strong> {booking.resourceId}
                        <br />
                        <strong>Requested by:</strong> {booking.requestedBy}
                        <br />
                        <strong>Purpose:</strong> {booking.purpose}
                        <br />
                        <strong>Time:</strong> {formatBookingTime(booking.startDateTime)} to {formatBookingTime(booking.endDateTime)}
                        {booking.approvedBy ? (
                          <>
                            <br />
                            <strong>Approved by:</strong> {booking.approvedBy}
                          </>
                        ) : null}
                        {booking.rejectionReason ? (
                          <>
                            <br />
                            <strong>Rejection reason:</strong> {booking.rejectionReason}
                          </>
                        ) : null}
                      </div>
                    </div>

                    <div className="booking-actions">
                      {editable ? (
                        <>
                          <button type="button" className="btn btn-primary" onClick={() => handleApprove(booking.id)}>
                            Approve
                          </button>
                          <button type="button" className="btn btn-secondary" onClick={() => handleReject(booking.id)}>
                            Reject
                          </button>
                        </>
                      ) : (
                        <button type="button" className="btn btn-secondary">
                          View only
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

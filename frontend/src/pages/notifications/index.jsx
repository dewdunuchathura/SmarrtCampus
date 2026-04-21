import { Link } from 'react-router-dom';

const updates = [
  'Show booking approvals, ticket replies, and system alerts in a single feed.',
  'Keep unread state and filters simple when the real notification data arrives.',
  'Make sure the route feels ready even before the backend connection is finished.'
];

export default function NotificationsPage() {
  return (
    <main className="app-page">
      <div className="app-page-inner">
        <section className="app-page-card">
          <span className="app-page-kicker">Notifications</span>
          <h1 className="app-page-title">Updates and alerts.</h1>
          <p className="app-page-copy">
            This page now presents the notifications route as a proper screen, while preserving the
            app&apos;s current structure and links.
          </p>

          <div className="app-page-actions">
            <Link className="app-btn-primary" to="/bookings/admin">Review bookings</Link>
            <Link className="app-btn-ghost" to="/tickets">Open tickets</Link>
          </div>

          <div className="app-page-list" aria-label="Notification notes">
            {updates.map((item) => (
              <div className="app-page-list-item" key={item}>
                <span className="app-page-list-dot" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

import { Link } from 'react-router-dom';

const highlights = [
  'Track rooms, labs, and equipment from one place.',
  'See resource status before you make a booking request.',
  'Keep the same simple interface while the backend grows.'
];

export default function ResourcesPage() {
  return (
    <main className="app-page">
      <div className="app-page-inner">
        <section className="app-page-card">
          <span className="app-page-kicker">Resources</span>
          <h1 className="app-page-title">Facility inventory at a glance.</h1>
          <p className="app-page-copy">
            This screen is now a small, finished landing page instead of a bare module stub.
            The current app flow stays the same, but the screen reads more like part of the product.
          </p>

          <div className="app-page-actions">
            <Link className="app-btn-primary" to="/bookings">View bookings</Link>
            <Link className="app-btn-ghost" to="/tickets">Go to tickets</Link>
          </div>

          <div className="app-page-list" aria-label="Resources highlights">
            {highlights.map((item) => (
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

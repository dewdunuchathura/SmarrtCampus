import { Link } from 'react-router-dom';

const steps = [
  'Log issues with enough detail for the maintenance team to respond quickly.',
  'Use priority labels to help staff sort urgent requests first.',
  'Keep the page visible now so the route is ready for the full ticket workflow.'
];

export default function TicketsPage() {
  return (
    <main className="app-page">
      <div className="app-page-inner">
        <section className="app-page-card">
          <span className="app-page-kicker">Tickets</span>
          <h1 className="app-page-title">Maintenance requests in one place.</h1>
          <p className="app-page-copy">
            The ticket screen now looks intentional while still keeping the current frontend flow
            exactly the same for users and testers.
          </p>

          <div className="app-page-actions">
            <Link className="app-btn-primary" to="/notifications">Check notifications</Link>
            <Link className="app-btn-ghost" to="/resources">Open resources</Link>
          </div>

          <div className="app-page-list" aria-label="Ticket guidance">
            {steps.map((item) => (
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

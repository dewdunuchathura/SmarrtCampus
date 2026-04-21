import { Link } from 'react-router-dom';

const steps = [
  'Sign in with your campus account when authentication is wired up.',
  'Use the same session to unlock role-specific booking and ticket actions.',
  'Keep login visible here so the route still makes sense during development.'
];

export default function AuthPage() {
  return (
    <main className="app-page">
      <div className="app-page-inner">
        <section className="app-page-card">
          <span className="app-page-kicker">Authentication</span>
          <h1 className="app-page-title">Login entry point.</h1>
          <p className="app-page-copy">
            This route stays lightweight for now, but it is no longer just a placeholder heading.
            The page gives users a clear idea of what this part of the app will do next.
          </p>

          <div className="app-page-actions">
            <Link className="app-btn-primary" to="/">Back to home</Link>
            <Link className="app-btn-ghost" to="/bookings">Continue browsing</Link>
          </div>

          <div className="app-page-list" aria-label="Authentication notes">
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

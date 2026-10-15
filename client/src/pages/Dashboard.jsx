
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const displayName = user?.name || "User";
  const firstName = displayName.trim().split(/\s+/)[0];

  return (
    <main className="dashboard-page dashboard-modern">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-brand">
          <span className="dashboard-brand-icon">A</span>
          <span>AuthFlow</span>
        </Link>

        <div className="dashboard-sidebar-label">
          WORKSPACE
        </div>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <Link
            to="/dashboard"
            className="dashboard-nav-link active"
            aria-current="page"
          >
            <span className="dashboard-nav-icon">⌂</span>
            Overview
          </Link>

          <Link to="/profile" className="dashboard-nav-link">
            <span className="dashboard-nav-icon">◎</span>
            My Profile
            <span className="dashboard-nav-arrow">↗</span>
          </Link>
        </nav>

        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-sidebar-user">
            <div className="dashboard-avatar">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="dashboard-user-details">
              <strong>{displayName}</strong>
              <span>Account holder</span>
            </div>
          </div>

          <button
            type="button"
            className="dashboard-sidebar-logout"
            onClick={handleLogout}
          >
            <span aria-hidden="true">↪</span>
            Sign out
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="dashboard-breadcrumb">
              Workspace <span>/</span> Overview
            </span>
            <h1>Dashboard</h1>
          </div>

          <Link to="/profile" className="dashboard-topbar-profile">
            <div className="dashboard-avatar small">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span>{firstName}</span>
            <span className="dashboard-chevron">⌄</span>
          </Link>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-welcome">
            <div className="dashboard-welcome-copy">
              <span className="dashboard-welcome-eyebrow">
                YOUR PERSONAL WORKSPACE
              </span>

              <h2>
                Welcome back, {firstName}
                <span aria-hidden="true"> 👋</span>
              </h2>

              <p>
                Everything you need to manage your AuthFlow
                account, all in one place.
              </p>

              <Link to="/profile" className="dashboard-welcome-cta">
                Manage your profile <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="dashboard-welcome-art" aria-hidden="true">
              <div className="dashboard-art-orbit orbit-one" />
              <div className="dashboard-art-orbit orbit-two" />
              <div className="dashboard-art-shield">
                <svg viewBox="0 0 64 64" fill="none">
                  <path
                    d="M32 7 51 15v14c0 13-8 22-19 28C21 51 13 42 13 29V15L32 7Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m23 32 6 6 13-14"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="dashboard-art-sparkle sparkle-one">✦</span>
              <span className="dashboard-art-sparkle sparkle-two">✧</span>
            </div>
          </section>

          <div className="dashboard-section-heading">
            <div>
              <h2>Account overview</h2>
              <p>Your account at a glance.</p>
            </div>
            <span className="dashboard-live-status">
              <span /> Account active
            </span>
          </div>

          <section className="dashboard-overview-grid">
            <article className="dashboard-info-card">
              <div className="dashboard-card-top">
                <span className="dashboard-card-icon blue">◎</span>
                <span className="dashboard-card-tag">PROFILE</span>
              </div>
              <h3>Personal information</h3>
              <p>Keep your account details up to date.</p>
              <Link to="/profile" className="dashboard-card-link">
                View details <span>→</span>
              </Link>
            </article>

            <article className="dashboard-info-card">
              <div className="dashboard-card-top">
                <span className="dashboard-card-icon violet">✧</span>
                <span className="dashboard-card-tag">IDENTITY</span>
              </div>
              <h3>Account identity</h3>
              <p>
                <span className="dashboard-detail-label">Full name</span>
                <strong className="dashboard-detail-value">
                  {user?.name || "Not available"}
                </strong>
              </p>
              <p>
                <span className="dashboard-detail-label">Email address</span>
                <strong className="dashboard-detail-value">
                  {user?.email || "Not available"}
                </strong>
              </p>
            </article>

            <article className="dashboard-info-card security-card">
              <div className="dashboard-card-top">
                <span className="dashboard-card-icon green">✓</span>
                <span className="dashboard-card-tag">SECURITY</span>
              </div>
              <h3>Security overview</h3>
              <p>
                AuthFlow authentication helps protect access to your account.
              </p>
              <div className="dashboard-security-status">
                <span /> Authentication enabled
              </div>
            </article>
          </section>

          <section className="dashboard-bottom-panel">
            <div className="dashboard-bottom-icon">✦</div>
            <div>
              <h3>Make your profile yours</h3>
              <p>
                Review your personal details and keep them current.
              </p>
            </div>
            <Link to="/profile" className="dashboard-bottom-link">
              Edit profile <span>→</span>
            </Link>
          </section>

          <footer className="dashboard-footer">
            <span>© {new Date().getFullYear()} AuthFlow</span>
            <span>Secure access. Simple experience.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;

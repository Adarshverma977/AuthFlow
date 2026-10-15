
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

const features = [
  {
    number: "01",
    icon: "◈",
    title: "Secure Authentication",
    description:
      "Password hashing and secure authentication practices help protect your account.",
    tone: "blue",
  },
  {
    number: "02",
    icon: "⌘",
    title: "Protected Access",
    description:
      "Access private account pages through authenticated routes.",
    tone: "purple",
  },
  {
    number: "03",
    icon: "◎",
    title: "Profile Management",
    description:
      "Keep your personal information organized in one simple dashboard.",
    tone: "mint",
  },
];

function Home() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  return (
    <main className="home-modern">
      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-eyebrow">
            <span className="home-eyebrow-dot" />
            YOUR ACCOUNT, SIMPLIFIED
          </div>

          <h1>
            Your digital identity,
            <span> under your control.</span>
          </h1>

          <p className="home-hero-description">
            A simpler way to access your account, manage your
            profile, and experience secure authentication —
            all from one place.
          </p>

          <div className="home-hero-actions">
            {!isAuthLoading && (
              isAuthenticated ? (
                <Link to="/dashboard" className="home-primary-link">
                  <Button>
                    Go to Dashboard <span>→</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="home-primary-link">
                    <Button>
                      Get Started <span>→</span>
                    </Button>
                  </Link>

                  <Link to="/login" className="home-secondary-link">
                    Sign in to your account
                  </Link>
                </>
              )
            )}
          </div>

          <div className="home-trust-note">
            <span className="home-trust-check">✓</span>
            <span>Simple experience. Secure access.</span>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-orbit home-orbit-one" />
          <div className="home-orbit home-orbit-two" />

          <div className="home-security-card">
            <div className="home-security-card-top">
              <div className="home-security-brand">
                <span className="home-security-brand-icon">A</span>
                <span>AuthFlow</span>
              </div>
              <span className="home-card-menu">•••</span>
            </div>

            <div className="home-shield">
              <svg
                viewBox="0 0 100 110"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M50 7L86 21V48C86 72 70 91 50 102C30 91 14 72 14 48V21L50 7Z"
                  fill="url(#homeShieldGradient)"
                  stroke="#A9B6FF"
                  strokeWidth="2"
                />
                <path
                  d="M35 53L45 63L66 41"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="homeShieldGradient"
                    x1="14"
                    y1="7"
                    x2="86"
                    y2="102"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#8E9EFF" />
                    <stop offset="1" stopColor="#6551CF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="home-security-copy">
              <span className="home-security-label">
                YOUR ACCOUNT
              </span>
              <h2>Security meets simplicity.</h2>
              <p>Your account experience, all in one place.</p>
            </div>

            <div className="home-security-divider" />

            <div className="home-security-bottom">
              <div>
                <span className="home-security-bottom-label">
                  EXPERIENCE
                </span>
                <strong>Made simple</strong>
              </div>
              <div className="home-security-mini-icon">✦</div>
            </div>
          </div>

          <div className="home-floating-chip home-chip-top">
            <span>✦</span> Thoughtful design
          </div>

          <div className="home-floating-chip home-chip-bottom">
            <span className="home-chip-check">✓</span> Protected routes
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-section-heading">
          <div>
            <span className="home-section-eyebrow">
              THE AUTHFLOW EXPERIENCE
            </span>
            <h2>Everything you need. Nothing you don't.</h2>
          </div>

          <p>
            Essential account features with a clean,
            focused experience.
          </p>
        </div>

        <div className="home-features-grid">
          {features.map((feature) => (
            <article
              className={`home-feature-card home-feature-${feature.tone}`}
              key={feature.number}
            >
              <div className="home-feature-top">
                <div className="home-feature-icon">
                  {feature.icon}
                </div>
                <span className="home-feature-number">
                  {feature.number}
                </span>
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <div className="home-feature-bottom">
                <span>Explore AuthFlow</span>
                <span aria-hidden="true">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-bottom-cta">
        <div>
          <span className="home-section-eyebrow">
            YOUR NEXT STEP
          </span>
          <h2>Ready to make it yours?</h2>
          <p>
            Get started with AuthFlow and manage your account
            from one convenient place.
          </p>
        </div>

        {!isAuthLoading && (
          <Link
            to={isAuthenticated ? "/dashboard" : "/signup"}
            className="home-primary-link"
          >
            <Button>
              {isAuthenticated ? "Open Dashboard" : "Create Account"}
              <span>→</span>
            </Button>
          </Link>
        )}
      </section>

      <footer className="home-modern-footer">
        <div className="home-footer-brand">
          <span className="home-footer-logo">A</span>
          <strong>AuthFlow</strong>
        </div>

        <p>Designed for a simpler account experience.</p>

        <span>© {new Date().getFullYear()} AuthFlow</span>
      </footer>
    </main>
  );
}

export default Home;

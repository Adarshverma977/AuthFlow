import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <p className="hero-badge">Welcome to AuthFlow</p>

        <h1>
          Authentication made
          <span> simple and secure.</span>
        </h1>

        <p className="hero-description">
          A secure authentication platform with account management
          and protected access, built for a better user experience.
        </p>

        <div className="hero-actions">
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>

          <Link to="/login">
            <Button variant="secondary">Sign In</Button>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Built with security in mind</h2>

        <div className="features-grid">
          <Card title="Secure Authentication">
            Passwords are protected with hashing and secure
            authentication practices.
          </Card>

          <Card title="Protected Access">
            Access account features through authenticated routes.
          </Card>

          <Card title="Account Management">
            Manage your profile through a dedicated account area.
          </Card>
        </div>
      </section>
    </main>
  );
}

export default Home;


import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <Link to="/" className="login-brand-logo">
          <span className="login-brand-mark">A</span>
          AuthFlow
        </Link>

        <div className="login-brand-content">
          <span className="login-eyebrow">
            YOUR ACCOUNT. YOUR CONTROL.
          </span>

          <h1>
            Security that
            <br />
            feels <span>effortless.</span>
          </h1>

          <p>
            A secure, seamless way to access your account and
            manage your profile with confidence.
          </p>

          <div className="login-visual-card">
            <div className="login-visual-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 3 19 6v5c0 4.7-2.9 8.1-7 10-4.1-1.9-7-5.3-7-10V6l7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <strong>Security-first access</strong>
              <span>Your account stays protected.</span>
            </div>

            <span className="login-status-dot" />
          </div>
        </div>

        <p className="login-brand-footer">
          Secure access. Simple experience.
        </p>
      </section>

      <section className="login-form-panel">
        <div className="login-form-container">
          <Link to="/" className="login-mobile-brand">
            <span className="login-brand-mark">A</span>
            AuthFlow
          </Link>

          <div className="login-form-heading">
            {location.state?.message && (
              <p className="success-message" role="status">
                {location.state.message}
              </p>
            )}
            <span className="login-form-kicker">WELCOME BACK</span>
            <h2>Sign in to AuthFlow</h2>
            <p>
              Enter your account details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form login-form">
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <Input
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <Button type="submit" loading={isLoading}>
              Sign In <span aria-hidden="true">→</span>
            </Button>

            <p className="auth-switch login-auth-switch">
              Don't have an account?{" "}
              <Link to="/signup">Create an account</Link>
            </p>
          </form>

          <div className="login-bottom-note">
            <span aria-hidden="true">◆</span>
            Protected account access
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;

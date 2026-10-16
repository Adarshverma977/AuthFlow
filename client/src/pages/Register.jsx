import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name,
        email,
        password: formData.password,
      });

      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please sign in." },
      });
    } catch (error) {
      const responseData = error.response?.data;

      setError(
        responseData?.message ||
        responseData?.error?.message ||
        "Registration failed. Please try again."
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
            Create your
            <br />
            <span>secure account.</span>
          </h1>

          <p>
            Join AuthFlow to access your account and manage
            your profile through a secure experience.
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
              <strong>Security-first registration</strong>
              <span>Your account starts with protection.</span>
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
            <span className="login-form-kicker">
              GET STARTED
            </span>
            <h2>Create your account</h2>
            <p>Enter your details to join AuthFlow.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-form login-form"
          >
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <Input
              label="Full name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              required
            />

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
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
            />

            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
            />

            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              Create Account <span aria-hidden="true">→</span>
            </Button>

            <p className="auth-switch login-auth-switch">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
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

export default Signup;

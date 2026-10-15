
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccess("Account created successfully!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page signup-page">
      <section className="login-brand-panel signup-brand-panel">
        <Link to="/" className="login-brand-logo">
          <span className="login-brand-mark">A</span>
          AuthFlow
        </Link>

        <div className="login-brand-content">
          <span className="login-eyebrow">
            START SOMETHING SECURE
          </span>

          <h1>
            Your next step
            <br />
            starts <span>here.</span>
          </h1>

          <p>
            Create your account and enjoy a simple,
            secure way to access and manage your profile.
          </p>

          <div className="signup-benefit-list">
            <div className="signup-benefit">
              <span className="signup-benefit-check">✓</span>
              <div>
                <strong>Simple account management</strong>
                <span>Keep your account details in one place.</span>
              </div>
            </div>

            <div className="signup-benefit">
              <span className="signup-benefit-check">✓</span>
              <div>
                <strong>Security-focused access</strong>
                <span>Designed with secure authentication in mind.</span>
              </div>
            </div>

            <div className="signup-benefit">
              <span className="signup-benefit-check">✓</span>
              <div>
                <strong>Your profile, your control</strong>
                <span>Access and manage your personal information.</span>
              </div>
            </div>
          </div>
        </div>

        <p className="login-brand-footer">
          A simpler way to manage your account.
        </p>
      </section>

      <section className="login-form-panel signup-form-panel">
        <div className="login-form-container signup-form-container">
          <Link to="/" className="login-mobile-brand">
            <span className="login-brand-mark">A</span>
            AuthFlow
          </Link>

          <div className="login-form-heading">
            <span className="login-form-kicker">
              CREATE YOUR ACCOUNT
            </span>

            <h2>Get started today</h2>

            <p>
              Fill in your details to create your AuthFlow account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-form login-form signup-form"
          >
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="success-message" role="status">
                {success}
              </p>
            )}

            <Input
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
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
              placeholder="Create a password"
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

            <Button type="submit" loading={isLoading}>
              Create Account <span aria-hidden="true">→</span>
            </Button>

            <p className="auth-switch login-auth-switch">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>
          </form>

          <div className="login-bottom-note">
            <span aria-hidden="true">◆</span>
            Secure account registration
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;

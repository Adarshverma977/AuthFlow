
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/profileService";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Profile() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData({
      name: user?.name ?? "",
      email: user?.email ?? "",
    });
  }, [user]);

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
    setIsLoading(true);

    try {
      const response = await updateProfile({
        name: formData.name.trim(),
      });

      const updatedUser =
        response.data?.user ??
        response.user ??
        response.data ??
        null;

      if (updatedUser) {
        setUser((previousUser) => ({
          ...previousUser,
          ...updatedUser,
        }));
      }

      setSuccess("Profile updated successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        "Unable to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const displayName = user?.name || "User";
  const initial = displayName.trim().charAt(0).toUpperCase();

  return (
    <main className="profile-page profile-modern">
      <header className="profile-topbar">
        <div>
          <span className="profile-breadcrumb">
            Workspace <span>/</span> My Profile
          </span>
          <h1>My Profile</h1>
          <p>Manage your personal information and account details.</p>
        </div>

        <Link to="/dashboard" className="profile-back-button">
          <span aria-hidden="true">←</span> Dashboard
        </Link>
      </header>

      <section className="profile-hero">
        <div className="profile-hero-decoration" aria-hidden="true" />

        <div className="profile-hero-avatar">
          {initial}
          <span className="profile-avatar-status" />
        </div>

        <div className="profile-hero-info">
          <span className="profile-hero-eyebrow">ACCOUNT PROFILE</span>
          <h2>{displayName}</h2>
          <p>{user?.email || "Email not available"}</p>
        </div>

        <div className="profile-account-badge">
          <span>✓</span> Account holder
        </div>
      </section>

      <div className="profile-content-grid">
        <section className="profile-details-panel">
          <div className="profile-panel-heading">
            <div className="profile-panel-icon">◎</div>
            <div>
              <h2>Personal information</h2>
              <p>Update your details using the form below.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form profile-form">
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
              disabled
              autoComplete="email"
            />

            <p className="profile-email-note">
              Your email address cannot be changed from this form.
            </p>

            <div className="profile-form-actions">
              <Button type="submit" loading={isLoading}>
                Save Changes <span aria-hidden="true">→</span>
              </Button>
            </div>
          </form>
        </section>

        <aside className="profile-side-column">
          <section className="profile-security-panel">
            <div className="profile-security-icon">✓</div>
            <h3>Account security</h3>
            <p>
              AuthFlow uses its authentication system to manage access
              to your account.
            </p>
            <div className="profile-security-status">
              <span /> Authentication enabled
            </div>
          </section>

          <section className="profile-help-panel">
            <span className="profile-help-symbol">✦</span>
            <h3>Keep your profile up to date</h3>
            <p>
              Make sure your personal information is accurate.
            </p>
            <Link to="/dashboard">
              Return to overview <span>→</span>
            </Link>
          </section>
        </aside>
      </div>

      <footer className="profile-footer">
        <span>© {new Date().getFullYear()} AuthFlow</span>
        <span>Secure access. Simple experience.</span>
      </footer>
    </main>
  );
}

export default Profile;

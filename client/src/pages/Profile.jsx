import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/profileService";

import Card from "../components/common/Card";
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

  return (
    <main className="profile-page">
      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>View and manage your account information.</p>
      </div>

      <Card title="Personal Information">
        <form onSubmit={handleSubmit} className="auth-form">
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
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            disabled
            autoComplete="email"
          />

          <Button type="submit" loading={isLoading}>
            Save Changes
          </Button>
        </form>
      </Card>

      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </main>
  );
}

export default Profile;

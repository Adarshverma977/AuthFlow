import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
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

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <h1>
            Welcome, {user?.name || "User"}!
          </h1>

          <p>Manage your account from your dashboard.</p>
        </div>

        <Button
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </section>

      <section className="dashboard-grid">
        <Card title="Account Information">
          <p>
            <strong>Name:</strong>{" "}
            {user?.name || "Not available"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email || "Not available"}
          </p>
        </Card>

        <Card title="Profile Management">
          <p>View and update your account information.</p>

          <Link to="/profile">
            <Button>View Profile</Button>
          </Link>
        </Card>

        <Card title="Account Security">
          <p>
            Your account is managed through AuthFlow's
            authentication system.
          </p>
        </Card>
      </section>
    </main>
  );
}

export default Dashboard;

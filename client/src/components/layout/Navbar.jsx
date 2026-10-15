import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          AuthFlow
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>

              <NavLink to="/profile">
                {user?.name || "My Profile"}
              </NavLink>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

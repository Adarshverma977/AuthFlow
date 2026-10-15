
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navbar navbar-modern">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-brand-icon">A</span>
          <span className="navbar-brand-text">
            Auth<span>Flow</span>
            <small>SECURE ACCESS PLATFORM</small>
          </span>
        </Link>

        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="authflow-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="authflow-navigation"
          className={`navbar-links navbar-modern-links ${isMenuOpen ? "navbar-menu-open" : ""
            }`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu}>
                Dashboard
              </NavLink>

              <NavLink to="/profile" onClick={closeMenu}>
                My Profile
              </NavLink>

              <div className="navbar-user-chip">
                <span className="navbar-user-avatar">
                  {(user?.name || "U").trim().charAt(0).toUpperCase()}
                </span>
                <span className="navbar-user-name">
                  {user?.name || "User"}
                </span>
              </div>

              <button
                type="button"
                className="navbar-logout-button"
                onClick={handleLogout}
              >
                <span aria-hidden="true">↗</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>
                Sign In
              </NavLink>

              <Link
                to="/signup"
                className="navbar-signup-link"
                onClick={closeMenu}
              >
                Get Started <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

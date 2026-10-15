import { Link } from "react-router-dom";

function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="auth-layout">
      <Link to="/" className="auth-logo">
        AuthFlow
      </Link>

      <div className="auth-content">
        <div className="auth-heading">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {children}
      </div>

      <p className="auth-footer">
        Secure authentication, simplified.
      </p>
    </main>
  );
}

export default AuthLayout;

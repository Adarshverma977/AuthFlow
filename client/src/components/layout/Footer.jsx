
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-modern">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-brand-icon">A</span>
          <span className="footer-brand-name">
            Auth<span>Flow</span>
          </span>
        </div>

        <p className="footer-tagline">
          Secure authentication, simplified.
        </p>

        <p className="footer-copyright">
          © {currentYear} AuthFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

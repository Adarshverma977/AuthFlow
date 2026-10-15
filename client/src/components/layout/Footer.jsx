function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {currentYear} AuthFlow. All rights reserved.
        </p>

        <p className="footer-tagline">
          Secure authentication, simplified.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo">
          <h2>Snapchat</h2>
          <p>Connecting people through moments.</p>
        </div>

        <div className="footer-links">
          <h3>Company</h3>

          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Support</a>
        </div>

        <div className="footer-links">
          <h3>Legal</h3>

          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>

      </div>

      <p className="copyright">
        © 2026 Snapchat Clone. Built with React.
      </p>
    </footer>
  );
}

export default Footer;
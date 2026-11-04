
import { ArrowRight, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            VORA<span>.</span>
          </Link>

          <p>
            A little bit of everything.
            <br />
            Everything for your everyday.
          </p>

          <Link to="/shop" className="footer__discover">
            Discover VORA
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="footer__links">
          <div className="footer__column">
            <span className="footer__heading">EXPLORE</span>

            <Link to="/shop">Shop All</Link>
            <Link to="/new-arrivals">New Arrivals</Link>
            <Link to="/about">About VORA</Link>
          </div>

          <div className="footer__column">
            <span className="footer__heading">GET IN TOUCH</span>

            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <div className="footer__message">
          <span>THE VORA EXPERIENCE</span>

          <p>
            Thoughtfully selected products.
            <br />
            Made for the way you live.
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © 2026 VORA. All rights reserved. Designed & Developed by
          Asmaa Qandil.
        </p>

        <button
          type="button"
          className="footer__top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={17} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;

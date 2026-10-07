import { ArrowUp } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
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
          <h2>VORA</h2>

          <p>
            Everything you need, all in one place.
            <br />
            Discover products made for everyday life.
          </p>

          <div className="footer__socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>

            <a href="#" aria-label="X">
              <FaXTwitter />
            </a>
          </div>
        </div>

        <div className="footer__column">
          <h3>Shop</h3>

          <a href="#">All Products</a>
          <a href="#">New Arrivals</a>
          <a href="#">Best Sellers</a>
          <a href="#">Offers</a>
        </div>

        <div className="footer__column">
          <h3>Categories</h3>

          <a href="#">Fashion</a>
          <a href="#">Electronics</a>
          <a href="#">Beauty</a>
          <a href="#">Home & Living</a>
        </div>

        <div className="footer__column">
          <h3>Customer Care</h3>

          <a href="#">Contact Us</a>
          <a href="#">Shipping & Delivery</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">FAQs</a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 VORA. All rights reserved.</p>

        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

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
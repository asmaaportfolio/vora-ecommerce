import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <nav className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          VORA
        </Link>

        <div className={`navbar__links ${menuOpen ? "is-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/shop" onClick={closeMenu}>
            Shop
          </Link>

          <Link to="/categories" onClick={closeMenu}>
            Categories
          </Link>

          <Link to="/new-arrivals" onClick={closeMenu}>
            New Arrivals
          </Link>

          <Link to="/offers" onClick={closeMenu}>
            Offers
          </Link>
        </div>

        <div className="navbar__actions">
          <button type="button" aria-label="Search">
            <Search size={20} />
          </button>

          <Link to="/wishlist" aria-label="Wishlist">
            <Heart size={20} />
          </Link>

          <Link to="/cart" aria-label="Shopping Cart">
            <ShoppingBag size={20} />
          </Link>

          <Link to="/account" aria-label="Account">
            <User size={20} />
          </Link>

          <button
            type="button"
            className="navbar__menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
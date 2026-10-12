
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import { getProducts } from "../services/productsApi";
import { useCart } from "../context/CartContext.jsx";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { cartCount, wishlist } = useCart();

  useEffect(() => {
    if (searchOpen) {
      searchRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (!cancelled) {
          setProducts(data);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load products. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [searchOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm("");
    setError("");
  };

  const searchResults = searchTerm.trim()
    ? products
        .filter((product) =>
          `${product.title} ${product.category} ${product.brand || ""}`
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        )
        .slice(0, 6)
    : [];

  const openProduct = (productId) => {
    closeSearch();
    closeMenu();
    navigate(`/product/${productId}`);
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
          <button
            type="button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              closeMenu();
            }}
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlist.length} items`}
            className="navbar__icon-link"
            onClick={closeSearch}
          >
            <Heart size={20} />

            {wishlist.length > 0 && (
              <span className="navbar__badge">
                {wishlist.length > 99 ? "99+" : wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping Cart, ${cartCount} items`}
            className="navbar__icon-link"
            onClick={closeSearch}
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="navbar__badge">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/account"
            aria-label="Account"
            onClick={closeSearch}
          >
            <User size={20} />
          </Link>

          <button
            type="button"
            className="navbar__menu"
            onClick={() => {
              setMenuOpen((open) => !open);
              closeSearch();
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="navbar-search">
          <div className="navbar-search__container">
            <div className="navbar-search__input">
              <Search size={19} />

              <input
                ref={searchRef}
                type="search"
                placeholder="Search products, categories, brands..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search products"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="navbar-search__results">
              {!searchTerm.trim() && (
                <p className="navbar-search__message">
                  Search for your favorite products.
                </p>
              )}

              {loading && (
                <p className="navbar-search__message">
                  Loading products...
                </p>
              )}

              {!loading && error && (
                <p className="navbar-search__message navbar-search__message--error">
                  {error}
                </p>
              )}

              {!loading &&
                !error &&
                searchTerm.trim() &&
                searchResults.length === 0 && (
                  <p className="navbar-search__message">
                    No products found. Try another search.
                  </p>
                )}

              {!loading &&
                !error &&
                searchResults.map((product) => (
                  <button
                    type="button"
                    className="navbar-search__result"
                    key={product.id}
                    onClick={() => openProduct(product.id)}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />

                    <span className="navbar-search__result-info">
                      <strong>{product.title}</strong>
                      <small>{product.category}</small>
                    </span>

                    <span className="navbar-search__result-price">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </button>
                ))}

              {!loading &&
                !error &&
                searchTerm.trim() &&
                searchResults.length > 0 && (
                  <Link
                    to={`/shop`}
                    className="navbar-search__view-all"
                    onClick={closeSearch}
                  >
                    View all products in Shop
                  </Link>
                )}
            </div>
          </div>

          <button
            type="button"
            className="navbar-search__backdrop"
            onClick={closeSearch}
            aria-label="Close search"
          />
        </div>
      )}
    </header>
  );
}

export default Navbar;

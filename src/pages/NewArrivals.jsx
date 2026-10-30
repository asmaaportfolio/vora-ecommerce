
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { getNewArrivals } from "../services/newArrivalsApi";
import { useCart } from "../context/CartContext.jsx";
import "./NewArrivals.css";

function formatCategory(category = "") {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function NewArrivalCard({ product, index }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const liked = isInWishlist(product.id);

  return (
    <article className="arrival-card shop-product-card">
      <div className="arrival-card__visual shop-product-card__visual">
        <Link
          to={`/product/${product.id}`}
          className="arrival-card__image-link shop-product-card__image-link"
          aria-label={`View ${product.title}`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />
        </Link>

        <span className="arrival-card__number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <button
          type="button"
          className={`arrival-card__wishlist ${liked ? "is-liked" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label={
            liked
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          aria-pressed={liked}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>

        <span className="arrival-card__tag">JUST IN</span>
      </div>

      <div className="arrival-card__details shop-product-card__details">
        <div className="arrival-card__topline">
          <span className="arrival-card__category">
            {formatCategory(product.category)}
          </span>

          <span className="arrival-card__rating">
            <Star size={13} fill="currentColor" />
            {Number(product.rating).toFixed(1)}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="arrival-card__title"
        >
          {product.title}
        </Link>

        <div className="arrival-card__bottom">
          <strong className="arrival-card__price">
            ${Number(product.price).toFixed(2)}
          </strong>

          <button
            type="button"
            className="arrival-card__add shop-product-card__cart"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag size={17} />
            <span>Add to bag</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let isMounted = true;

    async function loadNewArrivals() {
      try {
        setLoading(true);
        setError("");

        const data = await getNewArrivals();

        if (isMounted) {
          setProducts(data);
        }
      } catch {
        if (isMounted) {
          setError("We couldn't load the collection. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadNewArrivals();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        products.map((product) => product.category).filter(Boolean)
      ),
    ],
    [products]
  );

  const visibleProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter(
            (product) => product.category === activeCategory
          ),
    [products, activeCategory]
  );

  return (
    <main className="arrivals-page">
      {/* HERO SECTION */}
      <section className="arrivals-hero">
        <div className="arrivals-hero__content">
          <div className="arrivals-hero__eyebrow">
            <span className="arrivals-hero__eyebrow-dot" />
            NEW SEASON · VORA COLLECTION
          </div>

          <h1>
            New season.
            <br />
            <span>New favorites.</span>
          </h1>

          <p className="arrivals-hero__description">
            Explore the latest arrivals, thoughtfully selected
            to bring a fresh touch to your everyday style.
          </p>

          <a
            href="#arrival-collection"
            className="arrivals-hero__button"
          >
            <span>Explore new arrivals</span>
            <ArrowDownRight size={19} />
          </a>

          <div className="arrivals-hero__bottom-note">
            <span>FRESH STYLES, JUST ARRIVED</span>
            <span>DISCOVER YOUR VORA</span>
          </div>
        </div>

        <div className="arrivals-hero__visual">
          <img
            className="arrivals-hero__image"

src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85"
            alt="Fashion editorial featuring a modern seasonal outfit"
            fetchPriority="high"
          />

          <div className="arrivals-hero__image-shade" />

          <div className="arrivals-hero__image-top">
            <span>THE NEW COLLECTION</span>
            <span>V. / 01</span>
          </div>

          <div className="arrivals-hero__floating-card">
            <div className="arrivals-hero__floating-top">
              <span className="arrivals-hero__floating-mark">V.</span>
              <span>JUST ARRIVED</span>
            </div>

            <h2>
              Find your
              <br />
              next favorite.
            </h2>

            <a
              href="#arrival-collection"
              aria-label="Discover new arrivals"
            >
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="arrivals-hero__vertical-label">
            YOUR STYLE, YOUR WAY
          </div>

          <div className="arrivals-hero__visual-index">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS COLLECTION */}
      <section
        className="arrivals-collection"
        id="arrival-collection"
      >
        <div className="arrivals-collection__heading">
          <div>
            <span className="arrivals-section-label">
              FRESHLY SELECTED
            </span>
            <h2>Meet your next favorite.</h2>
          </div>

          {!loading && !error && (
            <span className="arrivals-collection__count">
              {visibleProducts.length} pieces
            </span>
          )}
        </div>

        {!loading && !error && products.length > 0 && (
          <div className="arrivals-filters">
            <div
              className="arrivals-filters__list"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? "arrivals-filter is-active"
                      : "arrivals-filter"
                  }
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category === "All"
                    ? "All pieces"
                    : formatCategory(category)}
                </button>
              ))}
            </div>

            <span className="arrivals-filters__caption">
              CONSIDERED FINDS, JUST ARRIVED
            </span>
          </div>
        )}

        {loading && (
          <div className="arrivals-message">
            <span className="arrivals-loader" />
            <p>Finding your next favorites...</p>
          </div>
        )}

        {!loading && error && (
          <div className="arrivals-message arrivals-message--error">
            <h3>A little pause.</h3>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Try again <ArrowUpRight size={16} />
            </button>
          </div>
        )}

        {!loading && !error && visibleProducts.length === 0 && (
          <div className="arrivals-message">
            <h3>Nothing here just yet.</h3>
            <p>Try another category to discover more pieces.</p>
          </div>
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <div className="arrivals-grid">
            {visibleProducts.map((product, index) => (
              <NewArrivalCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}

        <div className="arrivals-collection__footer">
          <span>GOOD FINDS DON'T STAY NEW FOR LONG.</span>
          <span>VORA — YOUR NEXT FAVORITE, WAITING TO BE FOUND.</span>
        </div>
      </section>

      {/* DISCOVER YOUR STYLE */}
      <section className="discover-style">
        <div className="discover-style__image">
          <img
src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=85"
            alt="VORA fashion collection"
            loading="lazy"
          />
        </div>

        <div className="discover-style__content">
          <span className="discover-style__eyebrow">
            YOUR STYLE, YOUR STORY
          </span>

          <h2>
            A Style That
            <span> Feels Like You.</span>
          </h2>

          <p>
            Discover pieces that bring effortless elegance
            to your everyday wardrobe. Find your next favorite
            and make every look your own.
          </p>

          <Link to="/shop" className="discover-style__button">
            Explore Collection
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NewArrivals;

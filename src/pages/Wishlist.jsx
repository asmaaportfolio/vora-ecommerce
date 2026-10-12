
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import "./Wishlist.css";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
  } = useCart();

  return (
    <main className="wishlist-page">
      <div className="wishlist-page__container">
        <div className="wishlist-page__header">
          <div>
            <span className="wishlist-page__eyebrow">
              YOUR COLLECTION
            </span>

            <h1>My Wishlist</h1>

            <p>
              Keep the things you love in one place.
            </p>
          </div>

          <span className="wishlist-page__count">
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "item" : "items"}
          </span>
        </div>

        {wishlist.length === 0 ? (
          <section className="wishlist-empty">
            <div className="wishlist-empty__icon">
              <Heart size={34} strokeWidth={1.5} />
            </div>

            <h2>Your wishlist is waiting</h2>

            <p>
              You haven't saved any products yet.
              Explore our collection and save your favorites here.
            </p>

            <Link
              to="/shop"
              className="wishlist-empty__button"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </section>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <article
                className="wishlist-card"
                key={product.id}
              >
                <div className="wishlist-card__image">
                  <img
                    src={product.thumbnail || product.image}
                    alt={product.title || product.name}
                  />

                  <button
                    type="button"
                    className="wishlist-card__remove"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    aria-label={`Remove ${
                      product.title || product.name
                    } from wishlist`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="wishlist-card__content">
                  <span className="wishlist-card__category">
                    {product.category
                      ?.replaceAll("-", " ")
                      || "Collection"}
                  </span>

                  <h2>
                    {product.title || product.name}
                  </h2>

                  <p className="wishlist-card__price">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="wishlist-card__cart"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag size={17} />

                    {product.stock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Wishlist;

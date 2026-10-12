
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import "./Cart.css";

function formatCategory(category = "") {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <section className="cart-empty">
          <div className="cart-empty__icon">
            <ShoppingBag size={34} />
          </div>

          <span className="cart-eyebrow">YOUR BAG</span>

          <h1>Your Cart Is Empty</h1>

          <p>
            Looks like you haven't added anything to your
            bag yet. Discover something you'll love.
          </p>

          <Link to="/shop" className="cart-primary-btn">
            Continue Shopping
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="cart-header__top">
          <Link to="/shop" className="cart-back-link">
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <span className="cart-eyebrow">YOUR BAG</span>
        </div>

        <h1>Shopping Cart</h1>

        <p>
          Review your selection and make it yours.
        </p>

        <div className="cart-header__count">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </div>
      </header>

      <div className="cart-layout">
        <section className="cart-items">
          <div className="cart-items__heading">
            <h2>Your Items</h2>
            <span>{cart.length} products</span>
          </div>

          {cart.map((product) => {
            const quantity = product.quantity || 1;
            const stock = product.stock ?? Infinity;
            const image = product.thumbnail || product.image;

            return (
              <article
                className="cart-item"
                key={product.id}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="cart-item__image"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={product.title}
                    />
                  ) : (
                    <ShoppingBag size={28} />
                  )}
                </Link>

                <div className="cart-item__details">
                  <span className="cart-item__category">
                    {formatCategory(product.category)}
                  </span>

                  <Link
                    to={`/product/${product.id}`}
                    className="cart-item__title"
                  >
                    {product.title}
                  </Link>

                  <span className="cart-item__unit-price">
                    ${Number(product.price).toFixed(2)} each
                  </span>

                  <div className="cart-item__mobile-actions">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            quantity - 1
                          )
                        }
                        disabled={quantity <= 1}
                        aria-label={`Decrease quantity of ${product.title}`}
                      >
                        <Minus size={14} />
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            quantity + 1
                          )
                        }
                        disabled={quantity >= stock}
                        aria-label={`Increase quantity of ${product.title}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() =>
                        removeFromCart(product.id)
                      }
                      aria-label={`Remove ${product.title} from cart`}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item__right">
                  <strong className="cart-item__subtotal">
                    $
                    {(
                      Number(product.price) * quantity
                    ).toFixed(2)}
                  </strong>

                  <div className="cart-quantity cart-quantity--desktop">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          quantity - 1
                        )
                      }
                      disabled={quantity <= 1}
                      aria-label={`Decrease quantity of ${product.title}`}
                    >
                      <Minus size={14} />
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          quantity + 1
                        )
                      }
                      disabled={quantity >= stock}
                      aria-label={`Increase quantity of ${product.title}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-item__remove cart-item__remove--desktop"
                    onClick={() =>
                      removeFromCart(product.id)
                    }
                    aria-label={`Remove ${product.title} from cart`}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </article>
            );
          })}

          <Link to="/shop" className="cart-continue-link">
            <ArrowLeft size={16} />
            Continue browsing
          </Link>
        </section>

        <aside className="cart-summary">
          <div className="cart-summary__heading">
            <h2>Order Summary</h2>
            <ShoppingBag size={20} />
          </div>

          <div className="cart-summary__row">
            <span>Subtotal</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <div className="cart-summary__row">
            <span>Items</span>
            <span>{cartCount}</span>
          </div>

          <div className="cart-summary__divider" />

          <div className="cart-summary__total">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <p className="cart-summary__note">
            Shipping and taxes are not included in this total.
          </p>

          <Link
            to="/shop"
            className="cart-summary__button"
          >
            Continue Shopping
          </Link>

          <div className="cart-summary__footer">
            <span>Thoughtfully selected.</span>
            <span>Made for your everyday.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { getProductById } from "../services/productsApi";
import { useCart } from "../context/CartContext.jsx";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const {
    cart,
    wishlist,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setQuantity(1);

      try {
        let data;

        if (/^\d+$/.test(id)) {
          data = await getProductById(id);
        } else {
          const savedProduct = [...cart, ...wishlist].find(
            (item) => String(item.id) === id
          );

          if (!savedProduct) {
            throw new Error("Product not found");
          }

          data = {
            ...savedProduct,
            title: savedProduct.title || savedProduct.name,
            thumbnail:
              savedProduct.thumbnail || savedProduct.image || "",
            images: [
              savedProduct.thumbnail || savedProduct.image,
            ].filter(Boolean),
            rating: Number(savedProduct.rating) || 0,
            stock: savedProduct.stock ?? 99,
            description:
              savedProduct.description ||
              "Discover this product from the VORA collection.",
            reviews: [],
          };
        }

        if (cancelled) return;

        setProduct(data);
        setSelectedImage(
          data.thumbnail || data.images?.[0] || ""
        );
      } catch {
        if (cancelled) return;

        setError("Unable to load this product.");
        setProduct(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id, cart, wishlist]);

  const liked = product ? isInWishlist(product.id) : false;

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((value) => value + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((value) => value - 1);
    }
  };

  if (loading) {
    return (
      <main className="product-details-page">
        <div className="product-details-state">
          <div className="product-details-loader"></div>
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <div className="product-details-state product-details-state--error">
          <h2>Product not found</h2>
          <p>{error || "This product is unavailable."}</p>
          <Link to="/shop">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const hasDiscount = product.discountPercentage > 0;

  const oldPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  const reviews = Array.isArray(product.reviews)
    ? product.reviews
    : [];

  const reviewCount = reviews.length;

  const reviewAverage = reviewCount
    ? reviews.reduce(
        (total, review) => total + (Number(review.rating) || 0),
        0
      ) / reviewCount
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter(
      (review) => Math.round(Number(review.rating) || 0) === rating
    ).length,
  }));

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        <nav
          className="product-details-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <strong>{product.title}</strong>
        </nav>

        <div className="product-details-content">
          <div className="product-details-gallery">
            <div className="product-details-thumbnails">
              {product.images?.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`product-details-thumbnail ${
                    selectedImage === image ? "is-active" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>

            <div className="product-details-main-image">
              {hasDiscount && (
                <span className="product-details-sale">SALE</span>
              )}

              <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
              />
            </div>
          </div>

          <div className="product-details-info">
            <span className="product-details-category">
              {product.category}
            </span>

            <h1>{product.title}</h1>

            <div className="product-details-rating">
              <div className="product-details-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    fill={
                      star <= Math.round(Number(product.rating) || 0)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>

              <span>{Number(product.rating || 0).toFixed(1)}</span>
            </div>

            <div className="product-details-price">
              <strong>${Number(product.price).toFixed(2)}</strong>

              {oldPrice !== null && (
                <del>${oldPrice.toFixed(2)}</del>
              )}

              {hasDiscount && (
                <span className="product-details-discount">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            <p className="product-details-description">
              {product.description}
            </p>

            <div className="product-details-meta">
              {product.brand && (
                <div className="product-details-meta-row">
                  <span>Brand</span>
                  <strong>{product.brand}</strong>
                </div>
              )}

              <div className="product-details-meta-row">
                <span>Availability</span>
                <strong>
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </strong>
              </div>

              {product.warrantyInformation && (
                <div className="product-details-meta-row">
                  <span>Warranty</span>
                  <strong>{product.warrantyInformation}</strong>
                </div>
              )}
            </div>

            <div className="product-details-divider"></div>

            {product.stock > 0 ? (
              <>
                <div className="product-details-actions">
                  <div className="product-details-quantity">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="product-details-cart"
                    onClick={() => addToCart(product, quantity)}
                  >
                    <ShoppingBag size={19} />
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className={`product-details-wishlist ${
                      liked ? "is-liked" : ""
                    }`}
                    onClick={() => toggleWishlist(product)}
                    aria-label={
                      liked
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    aria-pressed={liked}
                  >
                    <Heart
                      size={20}
                      fill={liked ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="product-details-shipping">
                  <Truck size={21} />

                  <div>
                    <strong>Free shipping</strong>
                    <span>Free shipping on this product</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="product-details-out-of-stock">
                This product is currently out of stock.
              </div>
            )}
          </div>
        </div>

        <section
          className="product-reviews"
          aria-labelledby="product-reviews-title"
        >
          <div className="product-reviews-heading">
            <div>
              <span className="product-reviews-eyebrow">
                THE CUSTOMER EXPERIENCE
              </span>

              <h2 id="product-reviews-title">
                Reviews & Ratings
              </h2>

              <p>
                Real feedback from customers about this product.
              </p>
            </div>

            <div className="product-reviews-total">
              <MessageSquareText size={18} />
              <span>
                {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
              </span>
            </div>
          </div>

          {reviewCount > 0 ? (
            <>
              <div className="product-reviews-summary">
                <div className="product-reviews-score">
                  <span className="product-reviews-score-label">
                    OVERALL RATING
                  </span>

                  <div className="product-reviews-average">
                    {reviewAverage.toFixed(1)}
                    <span>/5</span>
                  </div>

                  <div
                    className="product-reviews-summary-stars"
                    aria-label={`${reviewAverage.toFixed(1)} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={17}
                        fill={
                          star <= Math.round(reviewAverage)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>

                  <p>
                    Based on {reviewCount}{" "}
                    {reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>

                <div className="product-reviews-breakdown">
                  <h3>Rating breakdown</h3>

                  {ratingDistribution.map((item) => {
                    const percentage =
                      (item.count / reviewCount) * 100;

                    return (
                      <div
                        className="product-reviews-rating-row"
                        key={item.rating}
                      >
                        <span className="product-reviews-rating-label">
                          {item.rating}
                          <Star size={13} fill="currentColor" />
                        </span>

                        <div
                          className="product-reviews-rating-track"
                          role="progressbar"
                          aria-label={`${item.rating} star ratings`}
                          aria-valuemin={0}
                          aria-valuemax={reviewCount}
                          aria-valuenow={item.count}
                        >
                          <span
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <span className="product-reviews-rating-count">
                          {item.count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="product-reviews-summary-note">
                  <div className="product-reviews-note-icon">
                    <ShieldCheck size={23} />
                  </div>

                  <h3>Customer feedback</h3>

                  <p>
                    Explore the ratings and comments shared with this
                    product.
                  </p>
                </div>
              </div>

              <div className="product-reviews-list-heading">
                <div>
                  <span className="product-reviews-eyebrow">
                    CUSTOMER VOICES
                  </span>
                  <h3>What customers say</h3>
                </div>

                <span className="product-reviews-list-count">
                  {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </span>
              </div>

              <div className="product-reviews-list">
                {reviews.map((review, index) => {
                  const reviewerName =
                    review.reviewerName || "Customer";

                  const initials = reviewerName
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part.charAt(0))
                    .join("")
                    .toUpperCase();

                  const reviewDate = review.date
                    ? new Date(review.date)
                    : null;

                  const validDate =
                    reviewDate &&
                    !Number.isNaN(reviewDate.getTime());

                  return (
                    <article
                      className="product-review-card"
                      key={`${review.reviewerEmail || reviewerName}-${review.date || index}`}
                    >
                      <div className="product-review-top">
                        <div
                          className="product-review-avatar"
                          aria-hidden="true"
                        >
                          {initials || "C"}
                        </div>

                        <div className="product-review-customer">
                          <h4>{reviewerName}</h4>

                          <div className="product-review-meta">
                            {validDate && (
                              <time dateTime={review.date}>
                                {reviewDate.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </time>
                            )}

                            <span className="product-review-meta-dot">
                              ·
                            </span>

                            <span>Customer review</span>
                          </div>
                        </div>

                        <div
                          className="product-review-rating-badge"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          <Star size={14} fill="currentColor" />
                          <span>
                            {Number(review.rating || 0).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div
                        className="product-review-stars"
                        aria-hidden="true"
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={15}
                            fill={
                              star <= Math.round(Number(review.rating) || 0)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>

                      <p className="product-review-comment">
                        {review.comment || "No comment provided."}
                      </p>

                      <div className="product-review-footer">
                        <span>Product feedback</span>
                        <span className="product-review-footer-mark">
                          VORA
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="product-reviews-empty">
              <div className="product-reviews-empty-icon">
                <MessageSquareText size={27} />
              </div>

              <h3>No reviews yet</h3>

              <p>
                There are no customer reviews for this product yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { getProductById } from "../services/productsApi";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
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
        </div>
      </main>
    );
  }

  const hasDiscount = product.discountPercentage > 0;

  const oldPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        <nav className="product-details-breadcrumb">
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
                <span className="product-details-sale">
                  SALE
                </span>
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
                      star <= Math.round(product.rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>

              <span>{product.rating.toFixed(1)}</span>
            </div>

            <div className="product-details-price">
              <strong>${product.price.toFixed(2)}</strong>

              {oldPrice && (
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
                  <strong>
                    {product.warrantyInformation}
                  </strong>
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
                  >
                    <ShoppingBag size={19} />
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className={`product-details-wishlist ${
                      liked ? "is-liked" : ""
                    }`}
                    onClick={() => setLiked((value) => !value)}
                    aria-label={
                      liked
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
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
                    <span>
                      Free shipping on this product
                    </span>
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
      </div>
    </main>
  );
}

export default ProductDetails;
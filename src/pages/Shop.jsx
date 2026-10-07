/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { getProducts } from "../services/productsApi";
import "./Shop.css";

const PRODUCTS_PER_PAGE = 12;

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500+", min: 500, max: Infinity },
];

function formatCategory(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  const hasDiscount = product.discountPercentage > 0;

  const oldPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <article className="shop-product-card">
      <div className="shop-product-card__image">
        <img src={product.thumbnail} alt={product.title} />

        {hasDiscount && (
          <span className="shop-product-card__badge">SALE</span>
        )}

        <button
          type="button"
          className={`shop-product-card__wishlist ${
            liked ? "is-liked" : ""
          }`}
          onClick={() => setLiked((value) => !value)}
          aria-label={
            liked
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="shop-product-card__content">
        <span className="shop-product-card__category">
          {formatCategory(product.category)}
        </span>

        <h3>{product.title}</h3>

        <div className="shop-product-card__rating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating.toFixed(1)}</span>
        </div>

        <div className="shop-product-card__price">
          <strong>${product.price.toFixed(2)}</strong>

          {oldPrice && (
            <del>${oldPrice.toFixed(2)}</del>
          )}
        </div>

        <button
          type="button"
          className="shop-product-card__cart"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();

      result = result.filter((product) =>
        `${product.title} ${product.category} ${product.brand || ""}`
          .toLowerCase()
          .includes(searchTerm)
      );
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (priceRange !== "all") {
      const selectedRange = priceRanges.find(
        (range) => range.label === priceRange
      );

      if (selectedRange) {
        result = result.filter(
          (product) =>
            product.price >= selectedRange.min &&
            product.price < selectedRange.max
        );
      }
    }

    if (minRating > 0) {
      result = result.filter(
        (product) => product.rating >= minRating
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    priceRange,
    minRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handleRatingChange = (value) => {
    setMinRating(Number(value));
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceRange("all");
    setMinRating(0);
    setSortBy("featured");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search ||
    category !== "all" ||
    priceRange !== "all" ||
    minRating > 0;

  return (
    <div className="shop-page">
      <section className="shop-header">
        <div className="shop-header__content">
          <span className="section__label">VORA COLLECTION</span>

          <h1>Shop</h1>

          <p>
            Discover everything from everyday essentials to
            carefully selected products.
          </p>

          <span className="shop-header__breadcrumb">
            Home / Shop
          </span>
        </div>
      </section>

      <section className="shop-layout">
        <aside
          className={`shop-filters ${
            filtersOpen ? "is-open" : ""
          }`}
        >
          <div className="shop-filters__mobile-header">
            <h2>Filters</h2>

            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          <div className="shop-filters__header">
            <h2>Filters</h2>

            {hasActiveFilters && (
              <button type="button" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className="shop-filter">
            <h3>Categories</h3>

            <div className="shop-filter__options">
              <label>
                <input
                  type="radio"
                  name="category"
                  checked={category === "all"}
                  onChange={() =>
                    handleCategoryChange("all")
                  }
                />
                <span>All Products</span>
              </label>

              {categories.map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() =>
                      handleCategoryChange(item)
                    }
                  />
                  <span>{formatCategory(item)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="shop-filter">
            <h3>Price</h3>

            <div className="shop-filter__options">
              <label>
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "all"}
                  onChange={() =>
                    handlePriceChange("all")
                  }
                />
                <span>All Prices</span>
              </label>

              {priceRanges.map((range) => (
                <label key={range.label}>
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === range.label}
                    onChange={() =>
                      handlePriceChange(range.label)
                    }
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="shop-filter">
            <h3>Rating</h3>

            <div className="shop-filter__options">
              <label>
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 0}
                  onChange={() => handleRatingChange(0)}
                />
                <span>All Ratings</span>
              </label>

              {[4, 3, 2].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() =>
                      handleRatingChange(rating)
                    }
                  />

                  <span className="rating-option">
                    <Star size={13} fill="currentColor" />
                    {rating}.0 & above
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {filtersOpen && (
          <button
            type="button"
            className="shop-filters__overlay"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          />
        )}

        <div className="shop-content">
          <div className="shop-toolbar">
            <button
              type="button"
              className="shop-mobile-filter"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <div className="shop-toolbar__left">
              <span>
                {filteredProducts.length} products
              </span>
            </div>

            <div className="shop-toolbar__right">
              <div className="shop-search">
                <Search size={17} />

                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={handleSearch}
                />
              </div>

              <div className="shop-sort">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  aria-label="Sort products"
                >
                  <option value="featured">
                    Featured
                  </option>
                  <option value="name">
                    Name: A to Z
                  </option>
                  <option value="price-low">
                    Price: Low to High
                  </option>
                  <option value="price-high">
                    Price: High to Low
                  </option>
                  <option value="rating">
                    Highest Rated
                  </option>
                </select>

                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {loading && (
            <div className="shop-state">
              <div className="shop-loader"></div>
              <p>Loading products...</p>
            </div>
          )}

          {!loading && error && (
            <div className="shop-state shop-state--error">
              <h2>Unable to load products</h2>
              <p>{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            visibleProducts.length === 0 && (
              <div className="shop-state">
                <h2>No products found</h2>

                <p>
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            visibleProducts.length > 0 && (
              <>
                <div className="shop-products">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="shop-pagination">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage(
                          (page) => page - 1
                        )
                      }
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        type="button"
                        key={page}
                        className={
                          currentPage === page
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setCurrentPage(page)
                        }
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={
                        currentPage === totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) => page + 1
                        )
                      }
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
        </div>
      </section>
    </div>
  );
}

export default Shop;
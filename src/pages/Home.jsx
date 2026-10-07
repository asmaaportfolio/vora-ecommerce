import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Mail,
  ShoppingBag,
  Star,
} from "lucide-react";
import "./Home.css";

const categories = [
  {
    name: "Fashion",
    description: "Clothing, shoes & accessories",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Electronics",
    description: "Tech for everyday life",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Beauty",
    description: "Beauty & personal care",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Home & Living",
    description: "Make your space yours",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
  },
];

const featuredProducts = [
  {
    name: "Minimal Leather Bag",
    category: "Accessories",
    price: "$89.00",
    oldPrice: "$119.00",
    rating: "4.8",
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85",
  },
{
  name: "Premium Headphones",
  category: "Electronics",
  price: "$129.00",
  oldPrice: "$159.00",
  rating: "4.9",
  badge: "BEST SELLER",
  image:
    "https://images.unsplash.com/photo-1684703147716-014da6a31aa3?auto=format&fit=crop&w=800&q=85",
},
  {
    name: "Classic Sneakers",
    category: "Fashion",
    price: "$74.00",
    oldPrice: "$99.00",
    rating: "4.7",
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Everyday Watch",
    category: "Accessories",
    price: "$95.00",
    oldPrice: "$125.00",
    rating: "4.8",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85",
  },
];

const newArrivals = [
  {
    name: "Modern Sunglasses",
    category: "Accessories",
    price: "$59.00",
    rating: "4.7",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Smart Watch Pro",
    category: "Electronics",
    price: "$199.00",
    rating: "4.9",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Beauty Essentials",
    category: "Beauty",
    price: "$45.00",
    rating: "4.6",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Minimal Desk Lamp",
    category: "Home & Living",
    price: "$68.00",
    rating: "4.8",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",
  },
];

const bestSellers = [
  {
    name: "Classic Leather Wallet",
    category: "Accessories",
    price: "$49.00",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "$89.00",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Premium Hoodie",
    category: "Fashion",
    price: "$79.00",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Ceramic Vase",
    category: "Home & Living",
    price: "$39.00",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=85",
  },
];

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} />

        <button
          type="button"
          className={`product-card__wishlist ${
            liked ? "is-liked" : ""
          }`}
          onClick={() => setLiked((value) => !value)}
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>

        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
      </div>

      <div className="product-card__content">
        <span className="product-card__category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="product-card__rating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
        </div>

        <div className="product-card__price">
          <strong>{product.price}</strong>

          {product.oldPrice && <del>{product.oldPrice}</del>}
        </div>

        <button className="product-card__cart" type="button">
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function ProductSection({ label, title, products }) {
  return (
    <section className="products section">
      <div className="section__header">
        <div>
          <span className="section__label">{label}</span>
          <h2>{title}</h2>
        </div>

        <Link to="/shop" className="section__link">
          View All
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="products__grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.name} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  const handleSubscribe = (event) => {
    event.preventDefault();
  };

  return (
    <main className="home">
      <div className="promo-bar">
        <span>FREE SHIPPING ON ORDERS OVER $75</span>

        <Link to="/shop">
          Shop Now
          <ArrowRight size={14} />
        </Link>
      </div>

      <section className="hero">
        <div className="hero__image"></div>

        <div className="hero__content">
          <span className="hero__eyebrow">
            YOUR EVERYDAY MARKETPLACE
          </span>

          <h1>
            Everything you need.
            <br />
            <span>All in one place.</span>
          </h1>

          <p>
            Discover fashion, technology, beauty and home essentials
            carefully selected for everyday life.
          </p>

          <div className="hero__actions">
            <Link to="/shop" className="hero__button">
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link to="/categories" className="hero__secondary">
              Explore Categories
            </Link>
          </div>
        </div>

        <div className="hero__badge">
          <span>VORA</span>
          <strong>New Season</strong>
        </div>
      </section>

      <section className="categories section">
        <div className="section__header">
          <div>
            <span className="section__label">EXPLORE</span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/categories" className="section__link">
            View All
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="categories__grid">
          {categories.map((category) => (
            <Link
              to="/categories"
              className="category-card"
              key={category.name}
            >
              <img src={category.image} alt={category.name} />

              <div className="category-card__overlay">
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>

                <span>
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductSection
        label="OUR PICKS"
        title="Featured Products"
        products={featuredProducts}
      />

      <section className="promo">
        <div className="promo__content">
          <span className="section__label">SPECIAL OFFERS</span>

          <h2>
            Good products.
            <br />
            Better prices.
          </h2>

          <p>
            Discover selected products with special prices for a
            limited time.
          </p>

          <Link to="/offers" className="promo__button">
            Shop Offers
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="promo__visual">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=90"
            alt="VORA special offers"
          />
        </div>
      </section>

      <ProductSection
        label="JUST IN"
        title="New Arrivals"
        products={newArrivals}
      />

      <section className="editorial">
        <div className="editorial__image">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90"
            alt="VORA lifestyle collection"
          />
        </div>

        <div className="editorial__content">
          <span className="section__label">VORA EDIT</span>

          <h2>
            Made for your
            <br />
            <span>everyday.</span>
          </h2>

          <p>
            From pieces you wear to products that make your home
            better, discover things selected with modern everyday
            living in mind.
          </p>

          <Link to="/shop" className="editorial__link">
            Explore the collection
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <ProductSection
        label="MOST LOVED"
        title="Best Sellers"
        products={bestSellers}
      />

      <section className="trust section">
        <div className="trust__item">
          <div className="trust__icon">01</div>
          <div>
            <strong>Free Shipping</strong>
            <span>On orders over $75</span>
          </div>
        </div>

        <div className="trust__item">
          <div className="trust__icon">02</div>
          <div>
            <strong>Secure Payment</strong>
            <span>100% secure checkout</span>
          </div>
        </div>

        <div className="trust__item">
          <div className="trust__icon">03</div>
          <div>
            <strong>Easy Returns</strong>
            <span>30-day return policy</span>
          </div>
        </div>

        <div className="trust__item">
          <div className="trust__icon">04</div>
          <div>
            <strong>Customer Support</strong>
            <span>We're here to help</span>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter__content">
          <span className="section__label">STAY IN THE LOOP</span>

          <h2>Get VORA in your inbox.</h2>

          <p>
            Be the first to know about new arrivals, exclusive offers
            and special drops.
          </p>

          <form className="newsletter__form" onSubmit={handleSubscribe}>
            <div>
              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
            </div>

            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Home;

import {
  ArrowDownRight,
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const images = {
  fashion:
    "https://images.pexels.com/photos/34150928/pexels-photo-34150928.jpeg?auto=compress&cs=tinysrgb&w=1200",

  accessories:
    "https://images.pexels.com/photos/33806936/pexels-photo-33806936.jpeg?auto=compress&cs=tinysrgb&w=800",

  headphones:
    "https://images.pexels.com/photos/844923/pexels-photo-844923.jpeg?auto=compress&cs=tinysrgb&w=800",

  home:
    "https://images.pexels.com/photos/32922275/pexels-photo-32922275.jpeg?auto=compress&cs=tinysrgb&w=1100",

  outfit:
    "https://images.pexels.com/photos/3927390/pexels-photo-3927390.jpeg?auto=compress&cs=tinysrgb&w=1000",

  sneakers:
    "https://images.pexels.com/photos/1456735/pexels-photo-1456735.jpeg?auto=compress&cs=tinysrgb&w=1000",
};

const categories = [
  {
    number: "01",
    title: "Style & accessories",
    image: images.outfit,
    alt: "Clothing and accessories arranged in a flat lay",
  },
  {
    number: "02",
    title: "Home & living",
    image: images.home,
    alt: "Warm minimalist living room",
  },
  {
    number: "03",
    title: "Tech & lifestyle",
    image: images.headphones,
    alt: "Modern wireless headphones",
  },
];

function About() {
  return (
    <main className="about-page">
      {/* Opening */}
      <section className="about-opening">
        <div className="about-opening__content">
          <span className="about-eyebrow">
            GET TO KNOW VORA
          </span>

          <h1>
            Your world.
            <br />
            Your <span>finds.</span>
          </h1>

          <p>
            A place for the things you love, the details
            that inspire you, and the little finds that make
            everyday life better.
          </p>

          <Link to="/shop" className="about-primary-link">
            Explore the collection
            <ArrowUpRight size={18} />
          </Link>

          <div className="about-opening__note">
            <span className="about-opening__note-line" />
            <span>MORE TO DISCOVER, EVERY DAY</span>
          </div>
        </div>

        <div className="about-opening__visual">
          <div className="about-opening__main-image">
            <img
              src={images.fashion}
              alt="Men's fashion and everyday essentials"
            />
          </div>

          <div className="about-opening__floating-image about-opening__floating-image--watch">
            <img
              src={images.accessories}
              alt="Accessories in neutral colors"
            />
          </div>

          <div className="about-opening__floating-image about-opening__floating-image--tech">
            <img
              src={images.headphones}
              alt="Modern headphones"
            />
          </div>

          <div className="about-opening__stamp">
            <span>VORA</span>
            <small>THE ART OF FINDING</small>
          </div>

          <span className="about-opening__visual-number">
            01 / 04
          </span>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-introduction">
        <div className="about-introduction__label">
          <span>01</span>
          <span>WHO WE ARE</span>
        </div>

        <div className="about-introduction__content">
          <h2>
            Not one thing.
            <br />
            <span>Many possibilities.</span>
          </h2>

          <div className="about-introduction__text">
            <p>
              VORA brings together a considered mix of
              products across style, home, technology,
              and everyday essentials.
            </p>

            <p>
              We believe great finds are not just about
              what you buy. They are about how those
              things fit into your life.
            </p>
          </div>
        </div>
      </section>

      {/* Discover */}
      <section className="about-discover">
        <div className="about-section-heading">
          <div>
            <span className="about-eyebrow">
              A WORLD OF CHOICE
            </span>

            <h2>
              Find your <span>kind of good.</span>
            </h2>
          </div>

          <p>
            Different interests. Different needs.
            One place to explore them all.
          </p>
        </div>

        <div className="about-category-grid">
          {categories.map((category) => (
            <Link
              to="/shop"
              className="about-category-card"
              key={category.number}
            >
              <div className="about-category-card__image">
                <img
                  src={category.image}
                  alt={category.alt}
                />

                <span className="about-category-card__number">
                  {category.number}
                </span>

                <span className="about-category-card__arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>

              <div className="about-category-card__footer">
                <h3>{category.title}</h3>
                <span>EXPLORE</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="about-story__image">
          <img
            src={images.sneakers}
            alt="Neutral everyday sneakers"
          />

          <span className="about-story__image-caption">
            THE DETAILS MATTER
          </span>
        </div>

        <div className="about-story__content">
          <span className="about-eyebrow">
            THE VORA POINT OF VIEW
          </span>

          <h2>
            The joy is in
            <br />
            the <span>discovery.</span>
          </h2>

          <p>
            We want exploring to feel simple, inspiring,
            and worth coming back to. A thoughtful mix
            of products gives you room to find something
            that feels just right.
          </p>

          <div className="about-story__values">
            <div>
              <span>01</span>
              <p>Thoughtful variety</p>
            </div>

            <div>
              <span>02</span>
              <p>Everyday inspiration</p>
            </div>

            <div>
              <span>03</span>
              <p>A simpler way to explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ending */}
      <section className="about-ending">
        <div className="about-ending__top">
          <span className="about-eyebrow">
            YOUR NEXT FIND IS WAITING
          </span>

          <MoveUpRight size={25} />
        </div>

        <div className="about-ending__content">
          <h2>
            Come find
            <br />
            something <span>good.</span>
          </h2>

          <Link to="/shop" className="about-ending__link">
            Explore VORA
            <ArrowDownRight size={19} />
          </Link>
        </div>

        <span className="about-ending__wordmark">
          VORA
        </span>
      </section>
    </main>
  );
}

export default About;

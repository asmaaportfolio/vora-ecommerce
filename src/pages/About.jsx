
import { useEffect } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  Layers3,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const images = {
  hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2200&q=90",
  accessories:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  lifestyle:
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85",
  audio:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
};

const categories = [
  {
    number: "01",
    title: "Everyday essentials",
    description:
      "Thoughtful finds that make the little moments feel better.",
    image: images.accessories,
    alt: "A minimal wristwatch with a clean modern design",
  },
  {
    number: "02",
    title: "Home & living",
    description:
      "Pieces that bring more personality and comfort into your space.",
    image: images.lifestyle,
    alt: "A curated collection of books and lifestyle objects",
  },
  {
    number: "03",
    title: "Tech & more",
    description:
      "Useful discoveries that fit naturally into your everyday life.",
    image: images.audio,
    alt: "Modern headphones in a simple product composition",
  },
];

const principles = [
  {
    number: "01",
    title: "Curated, not crowded",
    description:
      "We believe finding something you love should feel simple, not overwhelming.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Different by design",
    description:
      "A mix of categories, ideas, and everyday discoveries in one place.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Made for real life",
    description:
      "Useful finds and thoughtful details that belong in your everyday routine.",
    icon: ShoppingBag,
  },
];

export default function About() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-about-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page">
      <section className="about-hero">
        <img
          className="about-hero__image"
          src={images.hero}
          alt="A thoughtfully arranged modern retail space"
          fetchPriority="high"
        />

        <div className="about-hero__shade" />

        <div className="about-hero__top">
          <span className="about-hero__eyebrow">
            A little more of what you love
          </span>
          <span className="about-hero__edition">VORA / OUR STORY</span>
        </div>

        <div className="about-hero__content">
          <p className="about-hero__overline">Not just another store.</p>
          <h1>
            Find your
            <br />
            kind of <em>everyday.</em>
          </h1>

          <div className="about-hero__bottom">
            <p>
              A considered mix of things to use, things to love, and things
              you didn’t know you were looking for.
            </p>

            <a className="about-hero__scroll" href="#our-story">
              <span>GET TO KNOW VORA</span>
              <ArrowDown size={17} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        <span className="about-hero__side-note">
          GOOD FINDS. EVERYDAY MOMENTS.
        </span>
      </section>

      <section className="about-intro" id="our-story">
        <div className="about-intro__label" data-about-reveal>
          <span className="about-section-index">01 / THE IDEA</span>
          <span className="about-small-line" />
          <span>WHAT WE BELIEVE</span>
        </div>

        <div className="about-intro__body" data-about-reveal>
          <h2>
            Life isn’t one thing.
            <br />
            <span>Neither should your store be.</span>
          </h2>

          <div className="about-intro__text">
            <p>
              The best finds don’t always come from looking for something
              specific. Sometimes they’re the things you stumble across,
              instantly connect with, and wonder how you lived without.
            </p>

            <p>
              That’s the idea behind VORA: a place to explore different
              categories, discover useful pieces, and find little things
              that feel just right for you.
            </p>

            <Link to="/shop" className="about-text-link">
              Explore the store
              <ArrowUpRight size={18} strokeWidth={1.7} />
            </Link>
          </div>
        </div>

        <div className="about-intro__signature" aria-hidden="true">
          V.
        </div>
      </section>

      <section className="about-world">
        <div className="about-world__heading" data-about-reveal>
          <div>
            <span className="about-section-index">02 / THE VORA WORLD</span>
            <h2>
              One place.
              <br />
              <em>Many discoveries.</em>
            </h2>
          </div>

          <p>
            Different interests, different routines, different ways of
            living. Explore a world of finds, brought together in one place.
          </p>
        </div>

        <div className="about-world__grid">
          {categories.map((category) => (
            <article
              className="about-category"
              key={category.number}
              data-about-reveal
            >
              <Link
                to="/shop"
                className="about-category__image-link"
                aria-label={`Explore the store: ${category.title}`}
              >
                <img
                  className="about-category__image"
                  src={category.image}
                  alt={category.alt}
                  loading="lazy"
                />
                <span className="about-category__arrow">
                  <ArrowUpRight size={20} strokeWidth={1.6} />
                </span>
              </Link>

              <div className="about-category__meta">
                <span>{category.number}</span>
                <span>DISCOVER MORE</span>
              </div>

              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>

        <div className="about-world__footer" data-about-reveal>
          <span>And there’s always something new to discover.</span>
          <Link to="/shop" className="about-text-link">
            Find your next favorite
            <ArrowUpRight size={18} strokeWidth={1.7} />
          </Link>
        </div>
      </section>

      <section className="about-manifesto">
        <div className="about-manifesto__top" data-about-reveal>
          <span className="about-section-index">03 / OUR APPROACH</span>
          <span>THE THINKING BEHIND THE FINDS</span>
        </div>

        <div className="about-manifesto__statement" data-about-reveal>
          <span className="about-manifesto__quote">“</span>
          <h2>
            Good things don’t
            <br />
            need to be complicated.
          </h2>
          <p>
            Just the right mix of choice, character, and things that make
            everyday life feel a little more yours.
          </p>
        </div>

        <div className="about-principles">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                className="about-principle"
                key={principle.number}
                data-about-reveal
              >
                <div className="about-principle__top">
                  <span>{principle.number}</span>
                  <Icon size={23} strokeWidth={1.4} />
                </div>

                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-cta" data-about-reveal>
        <div className="about-cta__content">
          <span className="about-section-index">YOUR NEXT DISCOVERY</span>
          <h2>
            There’s more
            <br />
            <em>to find.</em>
          </h2>
          <p>
            Take a look around. Your next favorite thing might be closer
            than you think.
          </p>

          <Link to="/shop" className="about-cta__button">
            Explore VORA
            <ArrowUpRight size={19} strokeWidth={1.7} />
          </Link>
        </div>

        <div className="about-cta__stamp" aria-hidden="true">
          <span>VORA</span>
          <span>FIND YOUR EVERYDAY</span>
          <span>EST. FOR DISCOVERY</span>
        </div>
      </section>
    </main>
  );
}

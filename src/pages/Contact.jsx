import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import "./Contact.css";

const contactDetails = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@vora-demo.com",
    href: "mailto:hello@vora-demo.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (000) 000-0000",
    href: "tel:+10000000000",
  },
  {
    icon: Clock3,
    label: "Working hours",
    value: "Monday – Friday, 9 AM – 6 PM",
  },
];

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, you can check its status through your account. Order tracking details will be available when your order is shipped.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "If you need to change or cancel an order, contact our support team as soon as possible. Changes may not be possible after the order has been processed.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We want you to feel confident with your purchase. Return eligibility and conditions can be reviewed in our store policies.",
  },
  {
    question: "How long does it take to receive a reply?",
    answer:
      "Our support team aims to respond to inquiries within one business day.",
  },
];

function Contact() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__content">
          <span className="contact-eyebrow">
            <span></span>
            WE'RE HERE TO HELP
          </span>

          <h1>
            Let's start a
            <br />
            <span>conversation.</span>
          </h1>

          <p>
            Have a question, need some help, or simply want to say hello?
            We'd love to hear from you. Our team is always happy to help.
          </p>

          <a href="#contact-form" className="contact-hero__link">
            Get in touch
            <ArrowDownRight size={19} />
          </a>
        </div>

        <div className="contact-hero__visual">
          <div className="contact-visual__top">
            <span>VORA / CUSTOMER CARE</span>
            <ArrowUpRight size={19} />
          </div>

          <div className="contact-visual__center">
            <span className="contact-visual__letter">V</span>
            <span className="contact-visual__circle"></span>
            <div className="contact-visual__message">
              <MessageCircle size={20} />
              <span>Here for you, always.</span>
            </div>
          </div>

          <div className="contact-visual__bottom">
            <span>GOOD THINGS START WITH A CONVERSATION.</span>
            <span>01 — 04</span>
          </div>
        </div>
      </section>

      <section className="contact-main" id="contact-form">
        <div className="contact-main__info">
          <span className="contact-eyebrow">
            <span></span>
            CONTACT DETAILS
          </span>

          <h2>
            We'd love to
            <br />
            <span>hear from you.</span>
          </h2>

          <p className="contact-main__description">
            Whether you have a question about a product or need assistance
            with an order, we're just a message away.
          </p>

          <div className="contact-details">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <div className="contact-detail" key={detail.label}>
                  <div className="contact-detail__icon">
                    <Icon size={20} />
                  </div>

                  <div className="contact-detail__content">
                    <span>{detail.label}</span>

                    {detail.href ? (
                      <a href={detail.href}>{detail.value}</a>
                    ) : (
                      <p>{detail.value}</p>
                    )}
                  </div>

                  {detail.href && (
                    <ArrowUpRight
                      className="contact-detail__arrow"
                      size={17}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="contact-main__note">
            <span>VORA</span>
            <p>Thoughtful shopping. Personal support.</p>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <div className="contact-form__heading">
            <span>01 / SEND A MESSAGE</span>
            <h3>How can we help?</h3>
            <p>Fill in the details below and let us know what's on your mind.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-subject">Subject</label>
              <select
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Order inquiry">Order inquiry</option>
                <option value="Product question">Product question</option>
                <option value="Returns and refunds">Returns & refunds</option>
                <option value="Other">Something else</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us how we can help..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-form__submit">
              Send message
              <Send size={17} />
            </button>

            {submitted && (
              <p className="contact-form__success" role="status">
                Thank you for reaching out! This is a demo form, so your
                message hasn't been sent.
              </p>
            )}

            <p className="contact-form__disclaimer">
              By submitting this form, you agree to be contacted about your
              inquiry.
            </p>
          </form>
        </div>
      </section>

      <section className="contact-faq">
        <div className="contact-faq__intro">
          <span className="contact-eyebrow">
            <span></span>
            NEED A QUICK ANSWER?
          </span>

          <h2>
            A few things
            <br />
            you might <span>wonder.</span>
          </h2>

          <p>
            Find answers to some of the questions we hear most often.
            Can't find what you're looking for? Send us a message.
          </p>
        </div>

        <div className="contact-faq__list">
          {faqs.map((faq, index) => (
            <div
              className={`contact-faq__item ${
                activeFaq === index ? "is-open" : ""
              }`}
              key={faq.question}
            >
              <button
                type="button"
                className="contact-faq__question"
                onClick={() =>
                  setActiveFaq(activeFaq === index ? -1 : index)
                }
                aria-expanded={activeFaq === index}
              >
                <span className="contact-faq__number">
                  0{index + 1}
                </span>

                <span>{faq.question}</span>

                <ChevronDown size={19} />
              </button>

              {activeFaq === index && (
                <div className="contact-faq__answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="contact-bottom">
        <div>
          <span>STILL HAVE A QUESTION?</span>
          <h2>We're only a message away.</h2>
        </div>

        <a href="#contact-form">
          Let's talk
          <ArrowUpRight size={19} />
        </a>
      </section>
    </main>
  );
}

export default Contact;
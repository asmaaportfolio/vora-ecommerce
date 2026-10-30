
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShoppingBag,
} from "lucide-react";
import "./Account.css";

function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(
      "This is a demo login page. Authentication is not connected yet."
    );
  };

  return (
    <main className="account-page">
      <section className="account-container">
        <div className="account-visual">
          <div className="account-visual__top">
            <ShoppingBag size={22} strokeWidth={1.6} />
            <span>VORA</span>
          </div>

          <div className="account-visual__content">
            <span className="account-eyebrow">
              YOUR STYLE, YOUR SPACE
            </span>

            <h1>
              A better way
              <br />
              to shop.
            </h1>

            <p>
              Discover the pieces you love and enjoy a shopping
              experience made around you.
            </p>

            <div className="account-visual__line">
              <span></span>
              <span>CURATED FOR EVERYDAY LIVING</span>
            </div>
          </div>

          <div className="account-visual__footer">
            <span>Thoughtfully selected.</span>
            <span>Made for you.</span>
          </div>
        </div>

        <div className="account-form-wrapper">
          <div className="account-form-header">
            <span className="account-form-eyebrow">
              WELCOME BACK
            </span>

            <h2>Sign in to VORA</h2>

            <p>
              Enter your details below to access your account.
            </p>
          </div>

          <form className="account-form" onSubmit={handleSubmit}>
            <div className="account-field">
              <label htmlFor="email">Email Address</label>

              <div className="account-input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="account-field">
              <label htmlFor="password">Password</label>

              <div className="account-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="account-form-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  setMessage("Password recovery is not available yet.")
                }
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="account-submit">
              Sign In
              <ArrowRight size={18} />
            </button>

            {message && (
              <p className="account-message" role="status">
                {message}
              </p>
            )}
          </form>

          <div className="account-divider">
            <span></span>
            <p>NEW TO VORA?</p>
            <span></span>
          </div>

          <button
            type="button"
            className="create-account"
            onClick={() =>
              setMessage("Account registration is coming soon.")
            }
          >
            Create an Account
          </button>

          <p className="account-terms">
            By continuing, you agree to VORA's shopping experience.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Account;
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import PublicLandingPage from "./pages/LandingPage.jsx";
import { isGoogleReviewUrl } from "./utils/googleReviewUrl.js";

import {
  ArrowRight,
  Star,
  ShieldCheck,
  QrCode,
  TrendingUp,
  MessageSquare,
  LayoutDashboard,
  Settings,
  LogOut,
  Sparkles,
  CheckCircle2,
  ChartNoAxesCombined,
  ThumbsUp,
  Building2,
  Plus,
  Copy,
  ExternalLink,
} from "lucide-react";

import "./index.css";
import "./App.css";

/* =========================================
   SHARED HELPERS
========================================= */

const getReviews = () => {
  try {
    return JSON.parse(localStorage.getItem("aakaar_reviews") || "[]");
  } catch {
    return [];
  }
};

const saveReviews = (reviews) => {
  localStorage.setItem("aakaar_reviews", JSON.stringify(reviews));
};

const getBusiness = () => {
  try {
    return JSON.parse(localStorage.getItem("aakaar_business") || "null");
  } catch {
    return null;
  }
};

const StarRating = ({ rating, size = 18 }) => (
  <div className="rating-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < rating ? "#F59E0B" : "none"}
        color={i < rating ? "#F59E0B" : "#CBD5E1"}
      />
    ))}
  </div>
);

const Logo = ({ light = false }) => (
  <Link
    to="/"
    className="brand"
    style={{ color: light ? "#fff" : "var(--navy)" }}
  >
    <span className="brand-mark">
      <ChartNoAxesCombined size={21} />
    </span>
    <span>
      AAKAAR<span style={{ color: "#2563EB" }}>.</span>
      <span
        style={{
          display: "block",
          fontSize: 9,
          letterSpacing: 2,
          fontWeight: 700,
          color: light ? "#CBD5E1" : "#8290A5",
          marginTop: -2,
        }}
      >
        REVIEWS
      </span>
    </span>
  </Link>
);

/* =========================================
   REGISTRATION PAGE
========================================= */

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    owner: "",
    business: "",
    email: "",
    password: "",
    category: "Other",
    googleReviewUrl: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.owner.trim() ||
      !form.business.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const googleReviewUrl = form.googleReviewUrl.trim();
    if (googleReviewUrl && !isGoogleReviewUrl(googleReviewUrl)) {
      setError(
        "Enter a valid HTTPS Google review link, such as a g.page or Google Maps review link.",
      );
      return;
    }

    const business = {
      ...form,
      googleReviewUrl,
      id: "business-" + Date.now(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("aakaar_business", JSON.stringify(business));
    localStorage.setItem("aakaar_logged_in", "true");

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-form">
          <Logo />

          <Link to="/" className="back-link">
            <ArrowRight size={15} style={{ transform: "rotate(180deg)" }} />
            Back to home
          </Link>

          <h1>Create your account.</h1>
          <p className="section-description">
            Start collecting customer feedback with AAKAAR.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Owner name *</label>
              <input
                className="form-input"
                placeholder="Your full name"
                value={form.owner}
                onChange={(e) =>
                  setForm({ ...form, owner: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Business name *</label>
              <input
                className="form-input"
                placeholder="Your business name"
                value={form.business}
                onChange={(e) =>
                  setForm({ ...form, business: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Business category</label>
              <select
                className="form-input"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                {[
                  "Restaurant",
                  "Cafe",
                  "Salon",
                  "Clinic",
                  "Retail",
                  "Education",
                  "Hotel",
                  "Professional Services",
                  "Other",
                ].map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Email address *</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                className="form-input"
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <div className="form-group" id="google-review-url">
              <label>Google review link (optional)</label>
              <input
                className="form-input"
                type="url"
                placeholder="Paste your Google review link"
                value={form.googleReviewUrl}
                onChange={(e) =>
                  setForm({ ...form, googleReviewUrl: e.target.value })
                }
              />
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Customers can choose to open this link after submitting
                feedback. Their Google review is published only on Google.
              </p>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button className="btn btn-primary auth-submit" type="submit">
              Create account <ArrowRight size={17} />
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>

      <div className="auth-visual">
        <div className="auth-visual-content">
          <Sparkles size={35} />
          <h2>Better feedback. Better business.</h2>
          <p>
            Give your customers a simple way to share their experience and
            give your business a better understanding of what matters.
          </p>

          <div className="auth-visual-stat">
            <TrendingUp size={23} />
            <div>
              <strong>One simple platform.</strong>
              <span>Everything in one place.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   LOGIN PAGE
========================================= */

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const business = getBusiness();

    if (!business) {
      setError("No demo account found. Please register first.");
      return;
    }

    if (
      business.email.toLowerCase() !== email.toLowerCase() ||
      business.password !== password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("aakaar_logged_in", "true");
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-form">
          <Logo />

          <Link to="/" className="back-link">
            <ArrowRight size={15} style={{ transform: "rotate(180deg)" }} />
            Back to home
          </Link>

          <h1>Welcome back.</h1>
          <p className="section-description">
            Log in to manage your business feedback.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button className="btn btn-primary auth-submit" type="submit">
              Log in <ArrowRight size={17} />
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>

      <div className="auth-visual">
        <div className="auth-visual-content">
          <LayoutDashboard size={38} />
          <h2>Your business, at a glance.</h2>
          <p>
            Access your customer ratings, feedback and review activity from
            one simple dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   DASHBOARD SIDEBAR
========================================= */

function DashboardSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("aakaar_logged_in");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <Logo />

      <div className="sidebar-business">
        <div className="business-avatar">
          <Building2 size={20} />
        </div>
        <div>
          <strong>{getBusiness()?.business || "My Business"}</strong>
          <span>Business account</span>
        </div>
      </div>

      <nav className="sidebar-links">
        <Link to="/dashboard" className="active">
          <LayoutDashboard size={18} /> Overview
        </Link>

        <a href="#reviews">
          <MessageSquare size={18} /> Customer reviews
        </a>

        <a href="#qr-code">
          <QrCode size={18} /> My QR code
        </a>

        <a href="#settings">
          <Settings size={18} /> Settings
        </a>
      </nav>

      <button className="sidebar-logout" onClick={logout}>
        <LogOut size={18} /> Log out
      </button>
    </aside>
  );
}

/* =========================================
   DASHBOARD
========================================= */

function DashboardPage() {
  const business = getBusiness();
  const [reviews, setReviews] = useState(getReviews());

  useEffect(() => {
    const update = () => setReviews(getReviews());
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5
  ).length;

  const reviewUrl = `${window.location.origin}/review/${
    business?.id || "demo-business"
  }`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl);
      alert("Review link copied!");
    } catch {
      alert("Please copy this link manually: " + reviewUrl);
    }
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <span className="dashboard-eyebrow">BUSINESS OVERVIEW</span>
              <h1>Welcome, {business?.owner || "Business Owner"}.</h1>
              <p>Here's what's happening with your customer feedback.</p>
            </div>

            <Link to={`/review/${business?.id || "demo-business"}`} className="btn btn-primary">
              <QrCode size={17} /> Preview review page
            </Link>
          </div>

          <div className="dashboard-stat-grid">
            <div className="dashboard-stat">
              <div className="dashboard-stat-top">
                <span>Total reviews</span>
                <MessageSquare size={20} />
              </div>
              <h2>{totalReviews}</h2>
              <span className="stat-change">
                <TrendingUp size={14} /> Customer responses
              </span>
            </div>

            <div className="dashboard-stat">
              <div className="dashboard-stat-top">
                <span>Average rating</span>
                <Star size={20} />
              </div>
              <h2>{averageRating}<small>/5</small></h2>
              <span className="stat-change">
                <TrendingUp size={14} /> Overall satisfaction
              </span>
            </div>

            <div className="dashboard-stat">
              <div className="dashboard-stat-top">
                <span>5-star reviews</span>
                <ThumbsUp size={20} />
              </div>
              <h2>{fiveStarReviews}</h2>
              <span className="stat-change">
                <TrendingUp size={14} /> Positive experiences
              </span>
            </div>
          </div>

          <div className="dashboard-two-column">
            <section className="dashboard-panel" id="qr-code">
              <div className="panel-heading">
                <div>
                  <h2>Your review QR</h2>
                  <p>Share this link with your customers.</p>
                </div>
                <QrCode size={23} color="#1746A2" />
              </div>

              <div className="qr-placeholder">
                <QrCode size={100} strokeWidth={1.2} />
                <span>YOUR BUSINESS QR</span>
              </div>

              <div className="review-link">
                <span>{reviewUrl}</span>
                <button onClick={copyLink} aria-label="Copy review link">
                  <Copy size={17} />
                </button>
              </div>

              <Link
                to={`/review/${business?.id || "demo-business"}`}
                className="btn btn-primary full-width"
              >
                Open customer review page <ExternalLink size={16} />
              </Link>

              <p className="qr-note">
                Note: This is a preview QR placeholder. A downloadable QR
                code will be added in the next stage.
              </p>
            </section>

            <section className="dashboard-panel" id="reviews">
              <div className="panel-heading">
                <div>
                  <h2>Recent feedback</h2>
                  <p>What your customers are saying.</p>
                </div>
                <MessageSquare size={22} color="#1746A2" />
              </div>

              {reviews.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <MessageSquare size={27} />
                  </div>
                  <h3>No reviews yet</h3>
                  <p>
                    Your customer feedback will appear here once someone
                    submits a review.
                  </p>
                </div>
              ) : (
                <div className="recent-reviews">
                  {[...reviews].reverse().slice(0, 5).map((review) => (
                    <div className="recent-review" key={review.id}>
                      <div className="recent-review-top">
                        <strong>{review.customer || "Customer"}</strong>
                        <StarRating rating={review.rating} size={13} />
                      </div>
                      <p>
                        {review.text || "Submitted a rating without written feedback."}
                      </p>
                      <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section className="dashboard-panel settings-panel" id="settings">
            <div>
              <h2>Business information</h2>
              <p>Manage your registered business details.</p>
            </div>

            <div className="business-information">
              <div>
                <span>Business name</span>
                <strong>{business?.business || "Not available"}</strong>
              </div>
              <div>
                <span>Owner</span>
                <strong>{business?.owner || "Not available"}</strong>
              </div>
              <div>
                <span>Category</span>
                <strong>{business?.category || "Other"}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{business?.email || "Not available"}</strong>
              </div>
              <div>
                <span>Google review profile</span>
                {business?.googleReviewUrl ? (
                  <a
                    href={business.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    Open configured profile
                  </a>
                ) : (
                  <strong>Not configured</strong>
                )}
              </div>
            </div>
          </section>

          <div className="dashboard-footer">
            Powered by <strong>AAKAAR Reviews</strong>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================
   CUSTOMER REVIEW PAGE
========================================= */

const reviewOptions = {
  5: [
    "Had a wonderful experience! The service was excellent, and everything was handled so well. Would definitely recommend this place.",
    "Really happy with my experience. The staff was friendly, the service was smooth, and the overall experience was great.",
    "One of the best experiences I've had. Great service, a welcoming atmosphere and attention to detail. Definitely coming back!",
    "Absolutely loved the experience. Everything was well organised, and the team made sure I was comfortable throughout.",
    "Very satisfied with the service. Professional, helpful and genuinely welcoming. Highly recommended!",
    "A great experience from start to finish. Really appreciate the effort and customer service.",
    "Had a really good time here. The quality and service were both impressive. Keep up the great work!",
    "Excellent experience overall. Friendly people, good service and a place I would happily visit again.",
    "I am genuinely impressed with the experience. Everything was smooth, and the staff was very helpful.",
    "Loved the service! You can tell that the team really cares about customer satisfaction.",
  ],
  4: [
    "Had a good experience overall. The service was nice, and the staff was helpful. Would visit again.",
    "Really good service and a pleasant experience. A few small things could be better, but overall very satisfied.",
    "Good experience! The team was friendly and the service was handled professionally.",
    "Quite happy with the overall experience. Would definitely recommend giving this place a try.",
    "The experience was good, and the staff was welcoming. Looking forward to visiting again.",
  ],
  3: [
    "The experience was okay overall. Some things were good, although there is room for improvement.",
    "A decent experience. The service was satisfactory, but a few things could be handled better.",
    "It was an average experience. I hope to see some improvements on my next visit.",
    "Not bad, but there are a few areas where the experience could be improved.",
  ],
  2: [
    "The experience was below my expectations. I hope the team takes customer feedback into consideration.",
    "There were a few issues during my experience. I believe some improvements would make a difference.",
    "I expected a better experience. Hopefully things improve in the future.",
  ],
  1: [
    "Unfortunately, my experience was not satisfactory. I hope the business looks into these concerns.",
    "I was disappointed with the overall experience. There is definitely room for improvement.",
    "My experience did not meet expectations. I hope the feedback helps improve the service.",
  ],
};

function CustomerReviewPage() {
  const { businessId } = useParams();

  const business = getBusiness();

  const [rating, setRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState("");
  const [customReview, setCustomReview] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const options = reviewOptions[rating] || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a star rating first.");
      return;
    }

    const reviewText = customReview.trim() || selectedReview;

    const newReview = {
      id: Date.now().toString(),
      businessId,
      customer: customerName.trim() || "Customer",
      rating,
      text: reviewText,
      createdAt: new Date().toISOString(),
    };

    const allReviews = getReviews();
    allReviews.push(newReview);
    saveReviews(allReviews);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="customer-review-page">
        <div className="customer-review-card success-card">
          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>
          <div className="section-label">FEEDBACK RECEIVED</div>
          <h1>Thank you for sharing!</h1>
          <p>
            Your feedback was sent to this business through AAKAAR. A Google
            review is separate and is only published if you choose to submit
            one on Google.
          </p>
          <StarRating rating={rating} size={24} />
          {business?.id === businessId && business.googleReviewUrl ? (
            <a
              href={business.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Continue to Google profile <ExternalLink size={16} />
            </a>
          ) : (
            <p className="text-sm text-slate-500">
              This business hasn’t connected a Google review profile.
            </p>
          )}
          <span className="success-brand">Powered by AAKAAR Reviews</span>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-review-page">
      <div className="customer-review-card">
        <div className="customer-review-brand">
          <Logo />
          <span>YOUR FEEDBACK MATTERS</span>
        </div>

        <div className="customer-business-icon">
          <Building2 size={29} />
        </div>

        <h1>How was your experience?</h1>

        <p className="customer-business-name">
          {business?.id === businessId
            ? business.business
            : "We value your experience"}
        </p>

        <p className="customer-review-description">
          Your feedback helps us understand what we're doing well and where
          we can improve.
        </p>

        <div className="customer-rating-select">
          <div className="customer-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                  setSelectedReview("");
                  setCustomReview("");
                }}
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  size={39}
                  fill={rating >= star ? "#F59E0B" : "none"}
                  color={rating >= star ? "#F59E0B" : "#CBD5E1"}
                />
              </button>
            ))}
          </div>

          <span>
            {rating === 0
              ? "Tap a star to rate your experience"
              : [
                  "",
                  "Poor",
                  "Below average",
                  "Average",
                  "Good",
                  "Excellent",
                ][rating]}
          </span>
        </div>

        {rating > 0 && (
          <form onSubmit={handleSubmit}>
            <div className="review-suggestions">
              <div className="review-suggestions-heading">
                <div>
                  <h3>Want to tell us more?</h3>
                  <p>Choose a message or write your own.</p>
                </div>
                <span>OPTIONAL</span>
              </div>

              <div className="suggestion-list">
                {options.map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`suggestion-option ${
                      selectedReview === option ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedReview(
                        selectedReview === option ? "" : option
                      );
                      setCustomReview("");
                    }}
                  >
                    <span>{option}</span>
                    <span className="suggestion-check">
                      {selectedReview === option ? (
                        <CheckCircle2 size={19} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </span>
                  </button>
                ))}
              </div>

              <div className="or-divider">
                <span>OR WRITE YOUR OWN</span>
              </div>

              <textarea
                className="customer-textarea"
                placeholder="Tell us about your experience in your own words..."
                rows={4}
                value={customReview}
                onChange={(e) => {
                  setCustomReview(e.target.value);
                  setSelectedReview("");
                }}
              />

              <input
                className="customer-name-input"
                placeholder="Your name (optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary review-submit">
              Submit feedback <ArrowRight size={17} />
            </button>
          </form>
        )}

        <div className="customer-review-footer">
          <ShieldCheck size={15} />
          Your feedback helps businesses improve.
        </div>
      </div>
    </div>
  );
}

/* =========================================
   ROUTE GUARD
========================================= */

function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem("aakaar_logged_in") === "true";

  return loggedIn ? children : <Navigate to="/login" replace />;
}

/* =========================================
   MAIN APP
========================================= */

function App() {
   useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("businesses")
        .select("id")
        .limit(1);

      if (error) {
        console.error("Supabase connection failed:", error.message);
      } else {
        console.log("Supabase connected successfully!", data);
      }
    }

    testConnection();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLandingPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/review/:businessId" element={<CustomerReviewPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

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

    if (
      googleReviewUrl &&
      !isGoogleReviewUrl(googleReviewUrl)
    ) {
      setError("Enter a valid HTTPS Google review link.");
      return;
    }

    setLoading(true);

    try {
      // STEP 1: Create Supabase authentication account
      const { data, error: signupError } =
        await supabase.auth.signUp({
          email: form.email.trim().toLowerCase(),
          password: form.password,

          options: {
            emailRedirectTo: `${window.location.origin}/login`,

            data: {
              owner_name: form.owner.trim(),
              business_name: form.business.trim(),
              category: form.category,
              google_review_url: googleReviewUrl,
            },
          },
        });

      if (signupError) {
        throw signupError;
      }

      // STEP 2: Handle email verification
      if (data.user && !data.session) {
        setSuccess(
          "Your account has been created successfully! Please check your email and click the verification link to activate your account. You can log in after verification."
        );

        return;
      }

      // STEP 3: If a session is returned, go to dashboard
      if (data.session) {
        navigate("/dashboard");
        return;
      }

      setSuccess(
        "Registration successful! Please check your email for further instructions."
      );

    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.message || "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-form">
          <Logo />

          <Link to="/" className="back-link">
            <ArrowRight
              size={15}
              style={{ transform: "rotate(180deg)" }}
            />
            Back to home
          </Link>

          <h1>Create your account.</h1>

          <p className="section-description">
            Start collecting customer feedback with AAKAAR.
          </p>

          <form onSubmit={handleSubmit}>

            {/* OWNER NAME */}
            <div className="form-group">
              <label>Owner name *</label>

              <input
                className="form-input"
                type="text"
                placeholder="Your full name"
                value={form.owner}
                onChange={(e) =>
                  setForm({
                    ...form,
                    owner: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* BUSINESS NAME */}
            <div className="form-group">
              <label>Business name *</label>

              <input
                className="form-input"
                type="text"
                placeholder="Your business name"
                value={form.business}
                onChange={(e) =>
                  setForm({
                    ...form,
                    business: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* BUSINESS CATEGORY */}
            <div className="form-group">
              <label>Business category</label>

              <select
                className="form-input"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
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
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email address *</label>

              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password *</label>

              <input
                className="form-input"
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                minLength={6}
                required
              />
            </div>

            {/* GOOGLE REVIEW LINK */}
            <div
              className="form-group"
              id="google-review-url"
            >
              <label>Google review link (optional)</label>

              <input
                className="form-input"
                type="url"
                placeholder="Paste your Google review link"
                value={form.googleReviewUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    googleReviewUrl: e.target.value,
                  })
                }
              />

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Customers can choose to open this link after
                submitting feedback. Their Google review is
                published only on Google.
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div
                className="form-success"
                role="status"
                style={{
                  background: "#ecfdf5",
                  color: "#047857",
                  border: "1px solid #a7f3d0",
                  padding: "14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  marginBottom: "16px",
                }}
              >
                {success}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-primary auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && <ArrowRight size={17} />}
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Log in</Link>
          </p>

        </div>
      </div>

      {/* RIGHT VISUAL PANEL */}
      <div className="auth-visual">
        <div className="auth-visual-content">
          <Sparkles size={35} />

          <h2>Better feedback. Better business.</h2>

          <p>
            Give your customers a simple way to share their
            experience and give your business a better
            understanding of what matters.
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
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (loginError) throw loginError;

      if (data.session) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

            <button
              className="btn btn-primary auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
              {!loading && <ArrowRight size={17} />}
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


function DashboardSidebar({ business }) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    try {
      setLoggingOut(true);

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="flex w-full flex-col border-r border-slate-200 bg-white md:min-h-screen md:w-64 md:shrink-0">
      {/* Brand */}
      <div className="border-b border-slate-100 px-6 py-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          aakaar<span className="text-blue-600">.</span>
        </h2>
        <p className="mt-1 text-xs font-medium tracking-wide text-slate-400">
          REVIEWS DASHBOARD
        </p>
      </div>

      {/* Business Profile */}
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
            {business?.business_name?.charAt(0)?.toUpperCase() || "B"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {business?.business_name || "Your Business"}
            </p>

            <p className="mt-1 truncate text-xs text-slate-400">
              {business?.category || "Business Account"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-row items-center gap-2 overflow-x-auto p-4 md:flex-col md:items-stretch">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex shrink-0 items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-left text-sm font-semibold text-blue-700"
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <span>★</span>
          Reviews
        </button>
      </nav>

      {/* Account and Logout */}
      <div className="border-t border-slate-100 p-4">
        <div className="mb-4 hidden px-3 md:block">
          <p className="truncate text-xs text-slate-400">
            Logged in as
          </p>
          <p className="mt-1 truncate text-sm font-medium text-slate-700">
            {business?.email || ""}
          </p>
        </div>

        <button
          onClick={logout}
          disabled={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>↪</span>
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}


/* =========================================
   DASHBOARD
========================================= */


function DashboardPage() {
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        // Get logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          throw new Error("Please log in to access your dashboard.");
        }

        // Fetch business profile
        const { data: businessData, error: businessError } =
          await supabase
            .from("businesses")
            .select("*")
            .eq("owner_id", user.id)
            .maybeSingle();

        if (businessError) throw businessError;

        if (!businessData) {
          throw new Error("Business profile not found.");
        }

        if (!isMounted) return;

        setBusiness(businessData);

        // Fetch business reviews
        const { data: reviewData, error: reviewError } =
          await supabase
            .from("reviews")
            .select("*")
            .eq("business_id", businessData.id)
            .order("created_at", { ascending: false });

        if (reviewError) throw reviewError;

        if (!isMounted) return;

        const formattedReviews = (reviewData || []).map((review) => ({
          id: review.id,
          customer: review.customer_name || "Customer",
          rating: review.rating,
          text: review.review_text || "",
          createdAt: review.created_at,
        }));

        setReviews(formattedReviews);
      } catch (err) {
        console.error("Dashboard error:", err);

        if (isMounted) {
          setError(err.message || "Unable to load dashboard.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-slate-900">
          Unable to load dashboard
        </h2>

        <p className="mb-6 text-sm text-slate-500">{error}</p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to Login
        </button>
      </div>
    );
  }

  // Dashboard calculations
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

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }));

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Sidebar */}
      <DashboardSidebar business={business} />

      {/* Main Content */}
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-sm font-medium text-blue-600">
                Business Dashboard
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome, {business.owner_name || "there"}!
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here's how your business reviews are performing.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs text-slate-400">Your Business</p>
              <p className="font-semibold text-slate-800">
                {business.business_name}
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-500">
                Total Reviews
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {totalReviews}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Reviews received
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-500">
                Average Rating
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {averageRating}
                <span className="ml-2 text-xl text-amber-400">★</span>
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Out of 5 stars
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-500">
                5-Star Reviews
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {fiveStarReviews}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Excellent customer ratings
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-slate-500">
                Business Category
              </p>
              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {business.category || "Other"}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Registered category
              </p>
            </div>
          </div>

          {/* Reviews Overview */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* Rating Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-6 text-lg font-bold text-slate-900">
                Rating Breakdown
              </h2>

              <div className="space-y-5">
                {ratingCounts.map(({ rating, count }) => {
                  const percentage =
                    totalReviews > 0
                      ? (count / totalReviews) * 100
                      : 0;

                  return (
                    <div key={rating}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-600">
                          {rating} Stars
                        </span>

                        <span className="text-slate-500">
                          {count}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-amber-400 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Business Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <h2 className="mb-6 text-lg font-bold text-slate-900">
                Business Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Business Name
                  </p>
                  <p className="mt-2 font-semibold text-slate-800">
                    {business.business_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Owner Name
                  </p>
                  <p className="mt-2 font-semibold text-slate-800">
                    {business.owner_name || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email Address
                  </p>
                  <p className="mt-2 break-all font-semibold text-slate-800">
                    {business.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Category
                  </p>
                  <p className="mt-2 font-semibold text-slate-800">
                    {business.category || "Other"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Reviews
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Customer feedback for your business
                </p>
              </div>

              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {totalReviews} Reviews
              </span>
            </div>

            {reviews.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mb-3 text-4xl">⭐</div>

                <h3 className="font-semibold text-slate-800">
                  No reviews yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Your customer reviews will appear here once submitted.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">
                        {review.customer}
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={
                              index < review.rating
                                ? "text-amber-400"
                                : "text-slate-200"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {review.text && (
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {review.text}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-xs text-slate-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
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

  const [business, setBusiness] = useState(null);
  const [businessLoading, setBusinessLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState("");
  const [customReview, setCustomReview] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const options = reviewOptions[rating] || [];

  // Fetch business details from Supabase
  useEffect(() => {
    let active = true;

    const fetchBusiness = async () => {
      try {
        setBusinessLoading(true);
        setError("");

        const { data, error: fetchError } = await supabase
          .from("businesses")
          .select("id, business_name, google_review_url")
          .eq("id", businessId)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data) {
          throw new Error("This business could not be found.");
        }

        if (active) setBusiness(data);
      } catch (err) {
        console.error("Business fetch error:", err);
        if (active) setError(err.message || "Unable to load business.");
      } finally {
        if (active) setBusinessLoading(false);
      }
    };

    fetchBusiness();

    return () => {
      active = false;
    };
  }, [businessId]);

  // Submit review to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a star rating first.");
      return;
    }

    if (!business) {
      setError("Business information is unavailable.");
      return;
    }

    const reviewText = customReview.trim() || selectedReview;

    try {
      setSubmitting(true);
      setError("");

      const { error: insertError } = await supabase
        .from("reviews")
        .insert([
          {
            business_id: business.id,
            customer_name: customerName.trim() || "Customer",
            rating: rating,
            review_text: reviewText || null,
          },
        ]);

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      console.error("Review submission error:", err);
      setError(
        err.message || "Unable to submit your feedback. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (businessLoading) {
    return (
      <div className="customer-review-page">
        <div className="customer-review-card">
          <p>Loading business details...</p>
        </div>
      </div>
    );
  }

  if (error && !business) {
    return (
      <div className="customer-review-page">
        <div className="customer-review-card">
          <h1>Business unavailable</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

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

          {business.google_review_url ? (
            <a
              href={business.google_review_url}
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
          {business.business_name || "We value your experience"}
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

            {error && (
              <p className="my-3 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary review-submit"
            >
              {submitting ? "Submitting..." : "Submit feedback"}
              {!submitting && <ArrowRight size={17} />}
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
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Check existing Supabase session
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (error) {
        console.error("Session error:", error.message);
        setSession(null);
      } else {
        setSession(data.session);
      }

      setLoading(false);
    };

    checkSession();

    // Listen for login and logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
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
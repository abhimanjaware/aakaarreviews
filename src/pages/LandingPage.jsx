import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Menu,
  MessageSquare,
  MousePointer2,
  QrCode,
  ScanLine,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { getConfiguredGoogleReviewUrl } from "../utils/googleReviewUrl.js";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="AAKAAR home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-900/15">
        <TrendingUp size={21} strokeWidth={2.5} />
      </span>
      <span>
        <span className="block text-[22px] font-extrabold leading-none tracking-[-1px] text-slate-950">
          AAKAAR<span className="text-emerald-600">.</span>
        </span>
        <span className="mt-1 block text-[8px] font-bold tracking-[3.5px] text-slate-400">
          REVIEWS
        </span>
      </span>
    </Link>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["Experience", "#experience"],
    ["How it works", "#how-it-works"],
    ["Pricing", "#pricing"],
    ["FAQ", "#faq"],
  ];

  return (
    <header className="relative z-50 h-[72px] border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-semibold text-slate-600 transition hover:text-blue-700"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 transition hover:text-blue-700"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
          >
            Get Started <ArrowUpRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="absolute inset-x-0 top-full flex flex-col gap-5 border-b border-slate-200 bg-white p-5 shadow-lg lg:hidden"
          aria-label="Mobile navigation"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-slate-700"
            >
              {label}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-slate-700"
          >
            Log in
          </Link>
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl bg-blue-700 py-3 text-center text-sm font-bold text-white"
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (!("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    let timer;
    let observer;
    let hasStarted = false;

    const animate = () => {
      if (hasStarted) return;
      hasStarted = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(value);
        return;
      }

      const startedAt = performance.now();
      const duration = 850;
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setCount(Math.floor(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) timer = window.requestAnimationFrame(tick);
      };
      timer = window.requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      animate();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(element);
    }

    return () => {
      observer?.disconnect();
      if (timer) window.cancelAnimationFrame(timer);
    };
  }, [value]);

  const formattedCount = decimals
    ? (count / 10 ** decimals).toFixed(decimals)
    : count.toLocaleString("en-IN");

  return (
    <span ref={ref} aria-label={`${formattedCount}${suffix}`}>
      {formattedCount}
      {suffix}
    </span>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[570px]">
      <div className="absolute -inset-8 rounded-full bg-emerald-100/70 blur-[75px]" />
      <div className="relative rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_28px_75px_rgba(15,23,42,0.12)] sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[2.5px] text-slate-400">
              AAKAAR WORKSPACE
            </p>
            <h2 className="mt-1.5 text-lg font-bold text-slate-900">
              Business overview
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              A clearer view of customer feedback
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp size={20} />
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              Customer feedback <MessageSquare size={14} className="text-blue-700" />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-slate-900">1,284</p>
            <p className="mt-1 text-[9px] font-semibold text-emerald-700">
              ↑ Sample feedback collected
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              Average rating <Star size={14} className="text-amber-500" />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-slate-900">4.8/5</p>
            <p className="mt-1 text-[9px] font-semibold text-emerald-700">
              Sample customer rating
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800">Customer satisfaction</p>
              <p className="mt-1 text-[9px] text-slate-400">Illustrative rating distribution</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1.5 text-[8px] font-bold tracking-wide text-emerald-700">
              SAMPLE
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="text-4xl font-black text-slate-900">4.8</p>
              <div className="mt-1 flex gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} fill="currentColor" />
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              {[92, 72, 42, 18, 8].map((width, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2 text-[8px] text-slate-400">{5 - index}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-100 p-3.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
              Review activity <span className="text-[8px] font-semibold text-slate-400">SAMPLE</span>
            </div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[26, 48, 36, 62, 54, 80, 68, 96].map((height, index) => (
                <span
                  key={index}
                  className="activity-bar flex-1 rounded-t-sm bg-emerald-500"
                  style={{ "--bar-height": `${height}%`, "--bar-delay": `${index * 45}ms` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 p-3.5">
            <p className="text-[10px] font-bold text-slate-700">Recent feedback · Sample</p>
            <p className="mt-2 text-[10px] leading-4 text-slate-500">
              “Friendly service and a lovely experience.”
            </p>
          </div>
        </div>
        <p className="mt-3 text-center text-[9px] text-slate-400">
          Illustrative dashboard preview · Sample data, not actual results
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section bg-[#F7F9FC] lg:h-[calc(100svh-72px)]">
      <div className="hero-inner mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 py-10 sm:px-8 lg:h-full lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-14 lg:py-8">
        <Reveal className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-2 text-[9px] font-bold uppercase tracking-[1.7px] text-emerald-800">
            <Sparkles size={13} className="text-emerald-600" />
            Smart customer feedback for local businesses
          </div>

          <p className="mb-2 text-sm font-extrabold tracking-[2px] text-blue-700">
            AAKAAR REVIEWS
          </p>
          <h1 className="max-w-[620px] text-[clamp(2.6rem,4.7vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.065em] text-slate-950">
            GROW YOUR BUSINESS WITH{" "}
            <span className="text-blue-700">AAKAAR.</span>
          </h1>
          <p className="mt-5 max-w-[560px] text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
            Turn everyday customer experiences into meaningful feedback. Collect
            reviews, understand your customers and build a stronger business
            reputation with one simple QR scan.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-blue-700 px-6 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Get Started <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#experience"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:text-emerald-800"
            >
              Experience AAKAAR <ArrowDown size={15} />
            </a>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[1.5px] text-slate-400">
              Illustrative sample data · Not actual AAKAAR results
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Customer feedback collected", value: 1284, suffix: "+" },
                { label: "Average customer rating", value: 48, suffix: "/5", decimals: 1 },
                { label: "Businesses using AAKAAR", value: 320, suffix: "+" },
              ].map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="flex items-center gap-1 text-xl font-extrabold tracking-tight text-emerald-700 sm:text-2xl">
                    <TrendingUp size={14} className="shrink-0" />
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </p>
                  <p className="mt-1 text-[10px] font-medium leading-4 text-slate-600 sm:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-[600px]">
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  );
}

function MobileDemo() {
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const autoPlayedRef = useRef(false);
  const [phase, setPhase] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [googleReviewUrl] = useState(getConfiguredGoogleReviewUrl);
  const submitted = phase >= 6;

  const runDemo = () => {
    window.clearTimeout(timerRef.current);
    setPhase(0);
    setIsPlaying(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(7);
      setIsPlaying(false);
      return;
    }

    const advance = (nextPhase) => {
      timerRef.current = window.setTimeout(() => {
        setPhase(nextPhase);
        if (nextPhase < 7) advance(nextPhase + 1);
        else setIsPlaying(false);
      }, 850);
    };
    advance(1);
  };

  const submitDemoFeedback = () => {
    if (phase < 2 || submitted) return;
    window.clearTimeout(timerRef.current);
    setPhase(6);
    setIsPlaying(true);
    timerRef.current = window.setTimeout(() => {
      setPhase(7);
      setIsPlaying(false);
    }, 850);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (!("IntersectionObserver" in window)) {
      autoPlayedRef.current = true;
      timerRef.current = window.setTimeout(runDemo, 0);
      return () => window.clearTimeout(timerRef.current);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoPlayedRef.current) {
          autoPlayedRef.current = true;
          runDemo();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const steps = [
    "Scan the business QR code.",
    "The feedback page opens.",
    "Select a star rating.",
    "Choose an optional suggestion.",
    "Optionally write a comment.",
    "Submit feedback to AAKAAR.",
    "See AAKAAR feedback confirmation.",
    "Choose whether to continue to Google.",
  ];
  const suggestions = ["Friendly service", "Quick and easy", "Great experience"];
  const stageNames = [
    "Scanning the QR code",
    "Opening the feedback page",
    "Selecting a rating",
    "Choosing a suggestion",
    "Writing optional feedback",
    "Sending feedback to AAKAAR",
    "Feedback received by AAKAAR",
    "Google review is a separate step",
  ];
  const cursorPosition = [
    { left: "72%", top: "158px" },
    { left: "78%", top: "224px" },
    { left: "79%", top: "298px" },
    { left: "18%", top: "376px" },
    { left: "78%", top: "442px" },
    { left: "78%", top: "510px" },
    { left: "78%", top: "510px" },
    { left: "78%", top: "510px" },
  ][Math.max(phase, 0)];
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="scroll-mt-20 overflow-hidden bg-[#F5F8F6] py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:px-14">
        <Reveal>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-emerald-700">
            EXPERIENCE AAKAAR
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-2px] text-slate-950 sm:text-5xl">
            Your customers.
            <br />
            Their smartphones.
            <br />
            <span className="text-emerald-700">One simple scan.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
            See how a customer can interact with your business through a simple
            mobile feedback experience.
          </p>
          <p className="mt-2 text-xs font-medium text-slate-500">
            Illustrative demo only · no feedback is sent from this preview.
          </p>

          <div className="mt-7 space-y-3">
            {steps.map((step, index) => {
              const complete = phase > index;
              const active = phase === index;
              return (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                      complete || active
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-slate-400 ring-1 ring-slate-200"
                    }`}
                  >
                    {complete ? <Check size={14} /> : `0${index + 1}`}
                  </span>
                  <span
                    className={`text-[13px] leading-5 transition sm:text-sm ${
                      active || complete ? "font-semibold text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        </Reveal>

        <Reveal className="relative flex flex-col items-center py-1">
          <div className="absolute inset-5 rounded-full bg-emerald-100/70 blur-[80px]" />
          <div className="relative w-full max-w-[320px] rounded-[40px] border-[7px] border-slate-900 bg-slate-900 p-2 shadow-[0_30px_75px_rgba(15,23,42,0.2)]">
            <div className="relative min-h-[620px] overflow-hidden rounded-[30px] bg-white">
              <div className="mx-auto mt-2 h-5 w-20 rounded-full bg-slate-900" />
              <div className="px-4 pb-5 pt-4 text-center sm:px-5">
                <div className="mb-3 inline-flex min-h-7 items-center gap-1.5 rounded-full bg-emerald-50 px-3 text-[10px] font-bold text-emerald-800" aria-live="polite">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  {phase >= 0 ? `STEP ${Math.min(phase + 1, 8)} OF 8 · ${stageNames[phase]}` : "READY FOR THE DEMO"}
                </div>
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-white">
                  <Star size={21} fill="white" />
                </div>
                <h3 className="mt-3 text-base font-extrabold text-slate-900">
                  Your Business
                </h3>
                <p className="mt-1 text-[11px] text-slate-500">
                  A quick check-in with your customers
                </p>

                <div className={`mt-4 rounded-2xl border p-3 transition-colors duration-300 ${
                  phase === 0 ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"
                }`}>
                  <QrCode
                    size={56}
                    className={`mx-auto transition duration-300 ${
                      phase >= 0 ? "text-emerald-700" : "text-slate-800"
                    }`}
                  />
                  <p className="mt-2 text-[11px] font-bold text-slate-800">
                    {phase >= 0 ? "QR code scanned" : "Scan to share feedback"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Sample QR · Demonstration only
                  </p>
                </div>

                {phase < 1 ? (
                  <div className="mt-4 rounded-xl bg-slate-50 px-3 py-4 text-xs leading-5 text-slate-600">
                    A QR scan opens the customer feedback page—no app install needed.
                  </div>
                ) : submitted ? (
                  <div className="mt-4">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <CheckCircle2 size={30} className="mx-auto text-emerald-700" />
                      <p className="mt-2 text-sm font-bold text-emerald-900">
                        Sample feedback received
                      </p>
                      <p className="mt-1 text-xs leading-5 text-emerald-800">
                        Sample journey: the customer’s rating and optional message are received by the business through AAKAAR.
                      </p>
                    </div>
                    <div className={`mt-3 rounded-xl border p-3 text-left transition-colors ${
                      phase >= 7 ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"
                    }`}>
                      <p className="text-[11px] font-bold text-slate-900">
                        Next: optional Google review
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-slate-600">
                        AAKAAR feedback is not a Google review. Google opens separately, and you decide whether to publish there.
                      </p>
                      {phase >= 7 && googleReviewUrl ? (
                        <a
                          href={googleReviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 text-[11px] font-bold text-white transition hover:bg-blue-800"
                        >
                          Continue to this business on Google <ExternalLink size={13} />
                        </a>
                      ) : phase >= 7 ? (
                        <Link
                          to="/register#google-review-url"
                          className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-blue-200 bg-white px-3 text-[11px] font-bold text-blue-800 transition hover:bg-blue-50"
                        >
                          Connect your Google review link
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className={`mt-4 rounded-2xl border p-3 text-left transition-colors ${
                    phase === 2 ? "border-amber-200 bg-amber-50/40" : "border-slate-200 bg-white"
                  }`}>
                    <p className="text-xs font-bold text-slate-800">
                      How was your experience?
                    </p>
                    <div className="mt-2 flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={25}
                          className="transition-all duration-200"
                          fill={phase >= 2 ? "#FBBF24" : "none"}
                          color={phase >= 2 ? "#FBBF24" : "#CBD5E1"}
                        />
                      ))}
                    </div>
                    {phase >= 2 && (
                      <>
                        <p className="mt-1 text-center text-[10px] font-semibold text-amber-700">
                          Excellent · 5 out of 5
                        </p>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                          <p className="text-[11px] font-bold text-slate-700">
                            What stood out? <span className="font-normal text-slate-500">Optional</span>
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {suggestions.map((suggestion, index) => (
                              <span
                                key={suggestion}
                                className={`rounded-full border px-2.5 py-1.5 text-[10px] transition ${
                                  phase >= 3 && index === 0
                                    ? "border-emerald-300 bg-emerald-50 font-semibold text-emerald-900"
                                    : "border-slate-200 text-slate-600"
                                }`}
                              >
                                {suggestion}
                              </span>
                            ))}
                          </div>
                        </div>
                        {phase >= 4 && (
                          <div className="mt-3 rounded-xl border border-slate-200 px-3 py-2.5">
                            <p className="text-[10px] font-semibold text-slate-500">
                              Your message <span className="font-normal">(optional)</span>
                            </p>
                            <p className="mt-1 min-h-5 text-[11px] leading-5 text-slate-700">
                              Friendly service and a lovely visit.
                              {phase === 4 && <span className="demo-caret" aria-hidden="true">|</span>}
                            </p>
                          </div>
                        )}
                        <div className="relative mt-3">
                          <button
                            type="button"
                            onClick={submitDemoFeedback}
                            aria-label="Submit sample feedback in the demonstration"
                            className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold text-white transition ${
                              phase >= 5 ? "bg-emerald-700" : "bg-blue-700"
                            }`}
                          >
                            {phase === 5 ? "Sending feedback…" : "Send sample feedback to AAKAAR"} <ArrowRight size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              {phase >= 0 && phase <= 5 && (
                <span
                  className="demo-cursor"
                  style={{ left: cursorPosition.left, top: cursorPosition.top }}
                  aria-hidden="true"
                >
                  <MousePointer2 size={27} fill="white" strokeWidth={2.2} />
                </span>
              )}
              {phase >= 7 && (
                <span
                  className="demo-cursor"
                  style={{ left: cursorPosition.left, top: cursorPosition.top }}
                  aria-hidden="true"
                >
                  <MousePointer2 size={27} fill="white" strokeWidth={2.2} />
                </span>
              )}
            </div>
            <span className="absolute -right-7 top-24 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-lg">
              <ScanLine size={21} />
            </span>
          </div>

          <div className="relative mt-4 min-h-11">
            {phase >= 7 && !isPlaying ? (
              <button
                type="button"
                onClick={runDemo}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-xs font-bold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 active:translate-y-0"
              >
                <ArrowUpRight size={14} className="rotate-[-45deg]" aria-hidden="true" />
                Replay Demo
              </button>
            ) : (
              <p className="text-[10px] font-medium text-slate-400" aria-live="polite">
                {isPlaying ? "Playing product demo…" : "Demo plays once when you reach this section"}
              </p>
            )}
          </div>
          <div className="relative mt-6 grid w-full max-w-[480px] grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[1.4px] text-slate-400">
                Before feedback
              </p>
              <p className="mt-2 text-[11px] font-semibold text-slate-700">
                No customer response captured yet
              </p>
            </div>
            <div className={`rounded-xl border p-3.5 transition-colors ${
              submitted ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"
            }`}>
              <p className="text-[9px] font-bold uppercase tracking-[1.4px] text-emerald-800">
                After feedback · Sample
              </p>
              <p className="mt-2 text-[11px] font-semibold text-slate-700">
                {submitted ? "5-star feedback received by AAKAAR" : "A rating and optional comment are captured"}
              </p>
            </div>
            <p className="col-span-2 text-center text-[10px] leading-4 text-slate-500">
              The comparison is illustrative. Google reviews are separate and only appear after the customer submits them on Google.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "DISPLAY YOUR QR CODE",
      description: "Place your unique AAKAAR QR code where customers can easily scan it.",
      icon: QrCode,
    },
    {
      number: "02",
      title: "COLLECT CUSTOMER FEEDBACK",
      description: "Customers select a rating and optionally share their experience.",
      icon: Star,
    },
    {
      number: "03",
      title: "UNDERSTAND & IMPROVE",
      description: "View feedback, monitor ratings and identify opportunities to improve your business.",
      icon: BarChart3,
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-14">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-emerald-700">
            HOW IT WORKS
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-1.5px] text-slate-950 sm:text-4xl">
            Small improvements can make a difference.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            A straightforward feedback journey for your business and your customers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(({ number, title, description, icon: Icon }, index) => (
            <Reveal key={number} delay={index * 80}>
              <article className="group relative h-full rounded-[24px] border border-slate-200 bg-[#FBFCFD] p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-3xl font-extrabold tracking-tight text-emerald-700">
                    {number}
                  </span>
                </div>
                <div className="mt-6 h-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className="block h-full rounded-full bg-emerald-500"
                    style={{ width: `${42 + index * 28}%` }}
                  />
                </div>
                <h3 className="mt-5 text-sm font-extrabold tracking-wide text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = ["Starter", "Growth", "Business"];

  return (
    <section id="pricing" className="scroll-mt-20 bg-[#F7F9FC] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-14">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-blue-700">
            PRICING
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-1.5px] text-slate-950 sm:text-4xl">
            A plan for your next step.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Pricing and plan details are being finalised. We’ll share confirmed
            options as soon as they’re ready.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan} delay={index * 70}>
              <article className={`flex h-full flex-col rounded-[24px] border bg-white p-6 shadow-sm sm:p-7 ${
                index === 1 ? "border-emerald-300 ring-1 ring-emerald-100" : "border-slate-200"
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{plan}</h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-emerald-800">
                    Coming soon
                  </span>
                </div>
                <p className="mt-6 text-[9px] font-bold uppercase tracking-[1.5px] text-slate-400">
                  Pricing
                </p>
                <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                  To be announced
                </p>
                <div className="my-5 h-px bg-slate-100" />
                <p className="flex-1 text-xs leading-6 text-slate-500">
                  Plan features and limits will be published when confirmed.
                </p>
                <Link
                  to="/register"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-xs font-bold text-white transition hover:bg-blue-800"
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-[10px] text-slate-400">
          Plan names are placeholders. No subscription price or plan capability is implied.
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);
  const questions = [
    {
      question: "What is AAKAAR?",
      answer:
        "AAKAAR is a QR-based customer feedback platform that helps businesses collect genuine feedback, understand customer experiences and manage review activity.",
    },
    {
      question: "How does QR-based feedback work?",
      answer:
        "Display your business QR code. Customers scan it with their phone, select a rating and can optionally share more about their experience.",
    },
    {
      question: "Do customers need to install an application?",
      answer:
        "No app installation is needed for the QR feedback experience. Customers scan the code using their phone camera and open the feedback page.",
    },
    {
      question: "Can customers submit feedback without writing a review?",
      answer:
        "Yes. Customers can select a rating without writing a comment. Any additional written feedback is optional.",
    },
    {
      question: "How can businesses view feedback?",
      answer:
        "Businesses can sign in to their AAKAAR account to view collected feedback and ratings in the business dashboard.",
    },
    {
      question: "How do I get started?",
      answer:
        "Select Get Started to create your business account, then set up your feedback experience and QR code.",
    },
  ];

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1100px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-14">
        <Reveal>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-blue-700">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-1.5px] text-slate-950 sm:text-4xl">
            Good questions.
            <br />
            Clear answers.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Everything you need to know to get started with AAKAAR.
          </p>
        </div>
        </Reveal>

        <div className="space-y-3">
          {questions.map(({ question, answer }, index) => {
            const isOpen = active === index;
            const panelId = `faq-answer-${index}`;
            return (
              <Reveal key={question} delay={index * 45}>
              <article
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen ? "border-emerald-200 bg-emerald-50/40" : "border-slate-200"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setActive(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="text-sm font-bold text-slate-900">{question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-emerald-700 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="text-sm leading-7 text-slate-600">{answer}</p>
                  </div>
                )}
              </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_0.8fr_0.8fr] lg:px-14">
        <Reveal>
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
            A simple way to collect genuine customer feedback, understand
            experiences and build a stronger business reputation.
          </p>
        </div>
        </Reveal>
        <Reveal>
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[2px] text-slate-900">
            EXPLORE
          </h2>
          <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <a href="#experience" className="hover:text-blue-700">Experience AAKAAR</a>
            <a href="#how-it-works" className="hover:text-blue-700">How it works</a>
            <a href="#pricing" className="hover:text-blue-700">Pricing</a>
            <a href="#faq" className="hover:text-blue-700">FAQ</a>
          </nav>
        </div>
        </Reveal>
        <Reveal>
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[2px] text-slate-900">
            ACCOUNT & CONTACT
          </h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-500">
            <Link to="/login" className="hover:text-blue-700">Log in</Link>
            <Link to="/register" className="hover:text-blue-700">Get Started</Link>
            <span className="text-xs text-slate-400">Contact details coming soon</span>
          </div>
        </div>
        </Reveal>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-5 text-[11px] text-slate-400 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-14">
          <p>© {new Date().getFullYear()} AAKAAR Reviews. All rights reserved.</p>
          <p>GROW YOUR BUSINESS WITH AAKAAR.</p>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main>
        <Hero />
        <MobileDemo />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;

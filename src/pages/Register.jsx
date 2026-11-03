import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-5 py-10">

      <div className="w-full max-w-[460px] rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">

        <Link to="/" className="mb-8 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#315EFB] text-white">
            <Star size={20} fill="white" />
          </div>

          <div>
            <h1 className="text-lg font-extrabold">
              AAKAAR<span className="text-blue-600">.</span>
            </h1>
            <p className="text-[9px] font-bold uppercase tracking-[3px] text-slate-400">
              REVIEWS
            </p>
          </div>

        </Link>

        <h2 className="text-3xl font-bold tracking-tight">
          Create your account.
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Start managing your customer feedback smarter.
        </p>

        <form className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full name
            </label>

            <input
              type="text"
              placeholder="Your full name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Business name
            </label>

            <input
              type="text"
              placeholder="Your business name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email address
            </label>

            <input
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#315EFB] py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create Account
            <ArrowRight size={17} />
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
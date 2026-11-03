import {
  LayoutDashboard,
  QrCode,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Users,
  Star,
  TrendingUp,
  Menu,
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    {
      title: "Total QR Scans",
      value: "1,284",
      change: "+12.8%",
      icon: QrCode,
    },
    {
      title: "Customer Feedback",
      value: "856",
      change: "+8.4%",
      icon: MessageSquare,
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "Illustrative",
      icon: Star,
    },
    {
      title: "Total Customers",
      value: "642",
      change: "+10.2%",
      icon: Users,
    },
  ];

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "QR Management", icon: QrCode },
    { name: "Feedback", icon: MessageSquare },
    { name: "Analytics", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      {/* SIDEBAR */}

      <aside className="hidden w-[260px] shrink-0 border-r border-slate-200 bg-white p-6 md:block">

        <Link to="/" className="flex items-center gap-3">

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

        <p className="mb-5 mt-12 text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
          WORKSPACE
        </p>

        <nav className="space-y-2">

          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  index === 0
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}

        </nav>

        <Link
          to="/"
          className="mt-16 flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-500"
        >
          <LogOut size={18} />
          Back to website
        </Link>

      </aside>


      {/* MAIN CONTENT */}

      <main className="min-w-0 flex-1">

        <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-10">

          <div>
            <p className="text-xs text-slate-400">
              Workspace / Overview
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
              A
            </div>

          </div>

        </header>


        <div className="p-6 lg:p-10">

          <div className="mb-10">

            <p className="text-sm text-slate-500">
              Welcome back!
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Business Overview
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Here's an overview of your business activity.
            </p>

          </div>


          {/* STATISTICS */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >

                  <div className="flex items-center justify-between">

                    <p className="text-xs font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={19} />
                    </div>

                  </div>

                  <h3 className="mt-6 text-3xl font-bold">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-emerald-600">
                    {stat.change}
                  </p>

                </div>
              );
            })}

          </div>


          {/* WELCOME CARD */}

          <div className="mt-8 rounded-2xl bg-[#101D3A] p-8 text-white">

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[2px] text-blue-300">
                  GET STARTED
                </p>

                <h2 className="mt-4 text-2xl font-bold">
                  Set up your business profile
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
                  Add your business details and prepare your first QR feedback experience.
                </p>
              </div>

              <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#101D3A] transition hover:bg-blue-50">
                Set up business
              </button>

            </div>

          </div>


          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8">

            <h3 className="text-lg font-bold">
              Recent Activity
            </h3>

            <div className="mt-10 py-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <TrendingUp size={25} />
              </div>

              <h4 className="mt-5 font-semibold">
                Your activity will appear here
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                Connect your account to start collecting feedback.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
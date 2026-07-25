import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, TrendingUp, ShieldCheck } from "lucide-react";
import api from "../services/api";

function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/public/leads", form);

      alert("Thank you! Our sales team will contact you shortly.");

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
      });
    } catch (err) {
      alert("Submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-6 px-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            LeadDesk
          </h1>
          <p className="text-sm text-slate-400">
            Smart CRM for modern sales teams
          </p>
        </div>

        <Link
          to="/login"
          className="bg-white text-slate-900 px-5 py-2 rounded-xl font-semibold hover:bg-slate-200 transition"
        >
          Staff Login
        </Link>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-8 py-16 items-center">

        {/* Left */}
        <div>

          <p className="text-blue-400 font-semibold uppercase tracking-widest">
            SALES CRM
          </p>

          <h2 className="text-5xl font-bold leading-tight mt-4">
            Capture Leads.
            <br />
            Manage Deals.
            <br />
            Close Faster.
          </h2>

          <p className="mt-6 text-slate-300 text-lg leading-8">
            LeadDesk helps businesses capture enquiries, assign leads,
            track activities, collaborate with the sales team and manage
            the complete sales pipeline from one dashboard.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">
              <Users className="text-blue-400" />
              <span>Lead Assignment & Collaboration</span>
            </div>

            <div className="flex items-center gap-4">
              <TrendingUp className="text-green-400" />
              <span>Pipeline Tracking & Analytics</span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="text-purple-400" />
              <span>Secure Role Based Access</span>
            </div>

          </div>

        </div>

        {/* Right Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

          <h3 className="text-3xl font-bold mb-2">
            Request a Demo
          </h3>

          <p className="text-slate-300 mb-8">
            Fill out the form and our team will reach out within 24 hours.
          </p>

          <form onSubmit={submit} className="space-y-5">

            <input
              placeholder="Full Name"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email Address"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Phone Number"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              placeholder="Company"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            <button
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
            >
              Request Demo
            </button>

          </form>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-slate-400">

        Built for Digital Heroes Training Task •{" "}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline"
        >
          digitalheroesco.com
        </a>

      </footer>

    </div>
  );
}

export default Home;
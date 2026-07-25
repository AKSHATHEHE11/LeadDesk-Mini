import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">

          <h1 className="text-5xl font-bold mb-4">
            LeadDesk
          </h1>

          <p className="text-lg text-blue-100 leading-8">
            Organize your leads, manage customers and boost your sales with a modern CRM dashboard.
          </p>

          <div className="mt-12 space-y-4 text-blue-100">

            <div>✔ Lead Management</div>
            <div>✔ Search & Pagination</div>
            <div>✔ Secure Authentication</div>
            <div>✔ Activity Tracking</div>

          </div>

        </div>

        {/* Right Side */}

        <div className="p-10 md:p-14">

          <div className="mb-10">

            <h2 className="text-4xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to continue to LeadDesk
            </p>

          </div>

          <form onSubmit={login} className="space-y-6">

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow-lg"
            >
              Sign In
            </button>

          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            LeadDesk Mini CRM © 2026
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
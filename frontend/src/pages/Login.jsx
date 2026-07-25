import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    ArrowRight,
    Loader2,
    Sparkles,
    Zap
} from "lucide-react";

import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message || "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="relative flex min-h-screen w-full bg-slate-50 overflow-hidden">
        
    {/* left side*/}
    <div className="hidden lg:flex w-1/2 relative bg-slate-900 text-white overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0">

            <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

            <div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-3xl animate-pulse"
                style={{ animationDelay: "1.5s" }}
            />

        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">

            {/* Logo */}

            <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-white text-slate-900 flex items-center justify-center shadow-lg">

                    <Sparkles size={24} />

                </div>

                <span className="text-3xl font-bold tracking-wide">
                    LeadDesk
                </span>

            </div>

            {/* Middle */}

            <div>

                <h1 className="text-5xl font-bold leading-tight">

                    Turn conversations
                    <br />
                    into customers.

                </h1>

                <p className="mt-6 text-slate-300 leading-8 text-lg">

                    A modern CRM designed to organize leads,
                    assign work, track progress and help
                    your team close more deals.

                </p>

                <div className="mt-12 space-y-5">

                    {[
                        "Real-time Lead Tracking",
                        "Team Collaboration",
                        "Advanced Analytics",
                        "Role Based Access"
                    ].map((item) => (

                        <div
                            key={item}
                            className="flex items-center gap-3 text-slate-200"
                        >

                            <Zap
                                size={18}
                                className="text-blue-400"
                            />

                            {item}

                        </div>

                    ))}

                </div>

            </div>

            <div className="text-slate-500 text-sm">

                © 2026 LeadDesk CRM

            </div>

        </div>

    </div>

    {/* Right Side */}
    <div className="relative flex flex-1 items-center justify-center px-6 py-12 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0">

            <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl animate-pulse" />

            <div
                className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-indigo-200/40 blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />

        </div>

        {/* Grid Background */}
        <div
            className="absolute inset-0 opacity-5"
            style={{
                backgroundImage:
                    "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg,#64748b 1px, transparent 1px)",
                backgroundSize: "42px 42px",
            }}
        />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden">

            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500" />

            <div className="p-10">

                <div className="flex lg:hidden justify-center mb-6">

                    <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center">

                        <Sparkles size={26} />

                    </div>

                </div>

                <h2 className="text-3xl font-bold text-slate-900 text-center">
                    Welcome Back
                </h2>

                <p className="text-center text-slate-500 mt-2 mb-8">
                    Sign in to your LeadDesk workspace
                </p>

                <form
                    onSubmit={login}
                    className="space-y-5"
                >

                    {/* Email */}

                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <div className="relative mt-2">

                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="you@company.com"
                                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>

                    </div>

                    {/* Password */}

                    <div>

                        <div className="flex justify-between items-center">

                            <label className="text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        <div className="relative mt-2">

                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>

                    </div>

                    {error && (

                        <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">

                            {error}

                        </div>

                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white py-3 font-semibold disabled:opacity-60"
                    >

                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={18} />
                            </>
                        )}

                    </button>

                </form>

            </div>

        </div>

    </div>

    </div>
  );
}

export default Login;
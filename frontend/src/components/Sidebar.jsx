import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Crown,
    Sparkles
} from "lucide-react";

function Sidebar() {

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col justify-between">

            <div>

                {/* Logo */}

                <div className="px-6 py-7 flex items-center gap-3 border-b">

                    <div className="h-11 w-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow">

                        <Sparkles size={20} />

                    </div>

                    <div>

                        <h1 className="font-bold text-xl text-slate-900">
                            LeadDesk
                        </h1>

                        <p className="text-xs text-slate-500">
                            Mini CRM
                        </p>

                    </div>

                </div>

                {/* Menu */}

                <nav className="mt-6 px-4 space-y-2">

                    <button className="flex items-center gap-3 w-full rounded-xl bg-slate-100 text-slate-900 px-4 py-3 font-medium">

                        <LayoutDashboard size={20} />

                        Dashboard

                    </button>

                    <button className="flex items-center gap-3 w-full rounded-xl hover:bg-slate-100 text-slate-600 px-4 py-3 transition">

                        <Users size={20} />

                        Leads

                    </button>

                    <button className="flex items-center gap-3 w-full rounded-xl hover:bg-slate-100 text-slate-600 px-4 py-3 transition">

                        <BarChart3 size={20} />

                        Analytics

                    </button>

                    <button className="flex items-center gap-3 w-full rounded-xl hover:bg-slate-100 text-slate-600 px-4 py-3 transition">

                        <Settings size={20} />

                        Settings

                    </button>

                </nav>

            </div>

            {/* Bottom */}

            <div className="p-4">

                <div className="rounded-2xl bg-slate-100 p-4">

                    <div className="flex items-center gap-2">

                        <Crown
                            className="text-amber-500"
                            size={18}
                        />

                        <span className="font-semibold">
                            Pro Plan
                        </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-2">
                        12 days left
                    </p>

                    <button className="mt-4 w-full rounded-xl bg-slate-900 text-white py-2">

                        Upgrade

                    </button>

                </div>

                <button
                    onClick={logout}
                    className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl border border-red-200 text-red-600 py-3 hover:bg-red-50 transition"
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;
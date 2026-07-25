import {
    Search,
    Bell
} from "lucide-react";

function Navbar() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (

        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">

            <div>

                <h2 className="text-3xl font-bold text-slate-900">

                    Dashboard

                </h2>

                <p className="text-slate-500">

                    Track, manage and convert your leads.

                </p>

            </div>

            <div className="flex items-center gap-6">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        placeholder="Search anything..."
                        className="w-80 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Notification */}

                <button className="relative">

                    <Bell
                        className="text-slate-600"
                        size={20}
                    />

                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>

                </button>

                {/* User */}

                <div className="flex items-center gap-3">

                    <div className="text-right">

                        <h4 className="font-semibold">

                            {user?.name}

                        </h4>

                        <p className="text-sm text-slate-500 capitalize">

                            {user?.role}

                        </p>

                    </div>

                    <div className="h-11 w-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">

                        {user?.name?.charAt(0)}

                    </div>

                </div>

            </div>

        </header>

    );
}

export default Navbar;
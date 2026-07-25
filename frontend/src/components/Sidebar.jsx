import { LayoutDashboard, Users, LogOut } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">LeadDesk</h1>

      <nav className="space-y-4">
        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-slate-800">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-slate-800">
          <Users size={20} />
          Leads
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-red-600 mt-10">
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
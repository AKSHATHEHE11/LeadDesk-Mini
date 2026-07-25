function Navbar() {
  return (
    <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Lead Dashboard
        </h2>
        <p className="text-slate-500 text-sm">
          Manage your leads efficiently
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          A
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#070B1A] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] border-r border-gray-800 p-6">

        <h1 className="text-3xl font-bold text-cyan-400">
          NEXTSTEP
        </h1>

        <nav className="mt-10 space-y-4">

          <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-xl">
            Dashboard
          </div>

          <div className="text-gray-400 hover:text-white cursor-pointer">
            Opportunities
          </div>

          <div className="text-gray-400 hover:text-white cursor-pointer">
            Bookmarks
          </div>

          <div className="text-gray-400 hover:text-white cursor-pointer">
            Applications
          </div>

          <div className="text-gray-400 hover:text-white cursor-pointer">
            AI Insights
          </div>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;
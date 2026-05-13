function Dashboard() {
  return (
    <div>

      <h1 className="text-4xl font-bold">
        Opportunity Dashboard
      </h1>

      <p className="text-gray-400 mt-2">
        AI-powered centralized student opportunity intelligence.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
          <h2 className="text-gray-400">Total Opportunities</h2>
          <p className="text-4xl font-bold mt-4 text-cyan-400">248</p>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
          <h2 className="text-gray-400">Hackathons</h2>
          <p className="text-4xl font-bold mt-4 text-purple-400">62</p>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
          <h2 className="text-gray-400">Internships</h2>
          <p className="text-4xl font-bold mt-4 text-green-400">124</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
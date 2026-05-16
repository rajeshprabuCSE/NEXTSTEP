import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateSummary,
} from "../services/aiService";

import {
  fetchOpportunities,
  searchOpportunities,
  filterOpportunities,
} from "../services/api";

import {
  addBookmark,
} from "../services/bookmarkService";

import {
  addApplication,
} from "../services/applicationService";
import {
  generateInsights,
} from "../services/aiService";

export default function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // TEMP AI USER SKILLS
  // =========================

  const userSkills =
    user?.skills || [];

  const [opportunities, setOpportunities] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [savedItems, setSavedItems] =
    useState([]);

  const [appliedItems, setAppliedItems] =
    useState([]);

  const [aiInsights, setAiInsights] =
  useState("");
  
  const [summaries, setSummaries] =
    useState({});


  // =========================
  // FETCH ALL
  // =========================

  const loadOpportunities = async () => {

    try {

      const data =
        await fetchOpportunities();

      if (data.data) {

  setOpportunities(data.data);

  // AI SUMMARY GENERATION

  const summaryData = {};

  for (const item of data.data) {

    const summary =
      await generateSummary(
        item.description ||
        item.title
      );

    summaryData[item.id] =
      summary;
  }

  setSummaries(summaryData);
  // AI INSIGHTS

const insightsData =
  await generateInsights({
    skills: userSkills,
    opportunities: data.data,
  });

setAiInsights(
  insightsData
);
}

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    loadOpportunities();

  }, []);


  // =========================
  // SEARCH
  // =========================

  const handleSearch = async (e) => {

    const keyword = e.target.value;

    setSearch(keyword);

    if (keyword.trim() === "") {

      loadOpportunities();

      return;
    }

    try {

      const data =
        await searchOpportunities(keyword);

      if (data.data) {
        setOpportunities(data.data);
      }

    } catch (error) {

      console.log(error);

    }
  };


  // =========================
  // FILTER
  // =========================

  const handleFilter = async (category) => {

    setActiveFilter(category);

    if (category === "All") {

      loadOpportunities();

      return;
    }

    try {

      const data =
        await filterOpportunities(category);

      if (data.data) {
        setOpportunities(data.data);
      }

    } catch (error) {

      console.log(error);

    }
  };


  // =========================
  // BOOKMARK
  // =========================

  const handleBookmark = async (id) => {

    try {

      await addBookmark({
        user_id: user.id,
        opportunity_id: id,
      });

      setSavedItems([
        ...savedItems,
        id
      ]);

      alert("Opportunity Saved");

    } catch (error) {

      console.log(error);

      alert("Failed to save");
    }
  };


  // =========================
  // APPLY + TRACK
  // =========================

  const handleApply = async (
    opportunity
  ) => {

    try {

      if (
        appliedItems.includes(
          opportunity.id
        )
      ) {

        window.open(
          opportunity.apply_link,
          "_blank"
        );

        return;
      }

      await addApplication({
        user_id: user.id,
        opportunity_id:
          opportunity.id,
        status: "Applied",
      });

      setAppliedItems([
        ...appliedItems,
        opportunity.id
      ]);

      window.open(
        opportunity.apply_link,
        "_blank"
      );

      alert(
        "Application Added To Tracker"
      );

    } catch (error) {

      console.log(error);

      alert("Failed to track");
    }
  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");
  };


  return (

    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div>

          <div className="logo">

            <h2>NEXTSTEP</h2>

            <p>
              AI Opportunity Intelligence
            </p>

          </div>


          <div className="nav-links">

            <a
              href="/dashboard"
              className="active"
            >
              Dashboard
            </a>

            <a href="/bookmarks">
              Bookmarks
            </a>

            <a href="/tracker">
              Tracker
            </a>

          </div>

        </div>


        <div className="sidebar-bottom">

          <h3>Automation First</h3>

          <p>
            Discover internships,
            hackathons, scholarships and
            opportunities powered by AI.
          </p>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* TOPBAR */}

        <div className="topbar">

          <div className="search-box">

            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={handleSearch}
            />

          </div>


          <div className="topbar-right">

            <div className="notification">
              3
            </div>


            <div className="profile">

              <div className="avatar">

                {user?.name?.charAt(0)}

              </div>


              <div>

                <h4>{user?.name}</h4>

                <p>Student</p>

              </div>

            </div>

          </div>

        </div>


        {/* HERO */}

        <section className="hero-section">

          <div className="hero-left">

            <h1>
              Welcome Back,
              <br />
              {user?.name}
            </h1>

            <p>
              Centralized AI-powered
              opportunity orchestration
              platform for students.
            </p>

            <div className="hero-badge">
              Automation • AI • Productivity
            </div>

          </div>


          <div className="hero-circle"></div>

        </section>


        {/* STATS */}

        <section className="stats-grid">

          <div className="stat-card">

            <span>Total Opportunities</span>

            <h2>
              {opportunities.length}
            </h2>

            <p>Live updates</p>

          </div>


          <div className="stat-card">

            <span>Hackathons</span>

            <h2>12</h2>

            <p>Trending</p>

          </div>


          <div className="stat-card">

            <span>Internships</span>

            <h2>28</h2>

            <p>Career growth</p>

          </div>


          <div className="stat-card">

            <span>Scholarships</span>

            <h2>9</h2>

            <p>Updated daily</p>

          </div>

        </section>


        {/* FILTERS */}

        <div className="filters">

          {[
            "All",
            "Internship",
            "Hackathon",
            "Workshop",
            "Scholarship",
          ].map((item) => (

            <button
              key={item}
              className={
                activeFilter === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleFilter(item)
              }
            >
              {item}
            </button>

          ))}

        </div>


        {/* OPPORTUNITIES */}

        {opportunities.length === 0 ? (

          <div className="empty-state">

            <h2>No Opportunities Found</h2>

            <p>
              Try changing search or filters.
            </p>

          </div>

        ) : (

          <section className="opportunity-grid">

            {opportunities.map(
              (opportunity) => {

                console.log(
                  "CURRENT OPPORTUNITY:",
                  opportunity
                );

                // =========================
                // SAFE SKILLS HANDLING
                // =========================

                const opportunitySkills =
                  Array.isArray(
                    opportunity.skills
                  )
                    ? opportunity.skills
                    : [];

                const matchedSkills =
                  opportunitySkills.filter(
                    (skill) =>
                      userSkills.includes(skill)
                  );

                const matchPercentage =
                  opportunitySkills.length > 0
                    ? Math.round(
                        (
                          matchedSkills.length /
                          opportunitySkills.length
                        ) * 100
                      )
                    : 0;

                return (

                  <div
                    key={opportunity.id}
                    className="opportunity-card"
                  >

                    <div className="tag">
                      {opportunity.category}
                    </div>

                    <h2>
                      {opportunity.title}
                    </h2>

                    <h4>
                      {opportunity.company}
                    </h4>

                    <p>
                      {opportunity.location}
                    </p>
                    <p className="ai-summary">
                   {
                     summaries[
                       opportunity.id
                     ]
                   }
                  </p>


                    {/* SKILLS */}

                  <div className="skills-container">
                                  
                    {opportunitySkills.length > 0 ? (
                    
                      opportunitySkills.map(
                        (skill, index) => (
                        
                          <span
                            key={index}
                            className="skill-badge"
                          >
                            {skill}
                          </span>
                  
                        )
                      )
                    
                    ) : (
                    
                      <span
                        style={{
                          color:"#64748b",
                          fontSize:"12px",
                        }}
                      >
                        No skills added
                      </span>
                  
                    )}
                  
                  </div>
                  
                  
                  {/* AI MATCH */}
                  
                  <div className="ai-match">
                  
                    <div className="ai-header">
                  
                      <span>
                        AI Match
                      </span>
                  
                      <span className="ai-percent">
                        {matchPercentage}%
                      </span>
                  
                    </div>
                  
                  
                    {/* PROGRESS BAR */}
                  
                    <div className="progress-bar">
                  
                      <div
                        className="progress-fill"
                        style={{
                          width:`${matchPercentage}%`
                        }}
                      ></div>
                  
                    </div>
                      
                      
                    {/* MATCHED SKILLS */}
                      
                    <div className="match-skills">
                      
                      {matchedSkills.length > 0 ? (
                      
                        matchedSkills.map(
                          (skill,index)=>(
                          
                            <span
                              key={index}
                              className="match-badge"
                            >
                              {skill}
                            </span>
                  
                          )
                        )
                      
                      ) : (
                      
                        <span
                          style={{
                            color:"#64748b",
                            fontSize:"12px",
                          }}
                        >
                          No matching skills
                        </span>
                  
                      )}
                  
                    </div>
                    
                  </div>
                    
                    
                  {/* ACTION BUTTONS */}
                    
                  <div className="card-footer">
                    
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleApply(
                          opportunity
                        )
                      }
                    >
                      {appliedItems.includes(
                        opportunity.id
                      )
                        ? "Applied"
                        : "Apply"}
                    </button>
                    
                    
                    <button
                      className="delete-btn"
                      disabled={savedItems.includes(
                        opportunity.id
                      )}
                      onClick={() =>
                        handleBookmark(
                          opportunity.id
                        )
                      }
                    >
                      {savedItems.includes(
                        opportunity.id
                      )
                        ? "Saved"
                        : "Save"}
                    </button>
                    
                  </div>

                  </div>

                );
              }
            )}

          </section>

        )}

      </main>


      {/* RIGHT PANEL */}

      <aside className="right-panel">

        <div className="panel-card">

          <h3>Upcoming Deadlines</h3>

          <div className="deadline">

            <div>

              <h4>Google Internship</h4>

              <p>May 25</p>

            </div>

          </div>


          <div className="deadline">

            <div>

              <h4>AI Hackathon</h4>

              <p>May 30</p>

            </div>

          </div>

        </div>


        <div className="panel-card">

          <h3>AI Insights</h3>

          <p
            style={{
              whiteSpace: "pre-line",
              lineHeight: "1.8",
              color: "#cbd5e1",
            }}
          >
            {aiInsights}
          </p>

          </div>

      </aside>

    </div>
  );
}

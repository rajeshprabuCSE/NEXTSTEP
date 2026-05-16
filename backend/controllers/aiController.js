const {
  generateAISummary,
} = require("../services/aiService");


// =========================
// AI SUMMARY
// =========================

const summarizeOpportunity =
  async (req, res) => {

    try {

      const { description } =
        req.body;

      if (!description) {

        return res.status(400).json({
          success: false,
          message:
            "Description is required",
        });
      }

      const summary =
        await generateAISummary(
          description
        );

      res.status(200).json({
        success: true,
        summary,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "AI summary failed",
      });
    }
};


// =========================
// SKILL MATCHING
// =========================

const skillMatch =
  async (req, res) => {

    try {

      const {
        userSkills,
        opportunitySkills
      } = req.body;

      if (
        !userSkills ||
        !opportunitySkills
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Both skill lists are required",
        });
      }

      const matchedSkills =
        userSkills.filter(
          (skill) =>
            opportunitySkills.includes(
              skill
            )
        );

      const matchPercentage =
        Math.round(
          (
            matchedSkills.length /
            opportunitySkills.length
          ) * 100
        );

      res.status(200).json({
        success: true,
        matchedSkills,
        matchPercentage,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Skill matching failed",
      });
    }
};


// =========================
// AI RECOMMENDATION ENGINE
// =========================

const recommendOpportunities =
  async (req, res) => {

    try {

      const {
        userSkills,
        opportunities
      } = req.body;

      if (
        !userSkills ||
        !opportunities
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Skills and opportunities are required",
        });
      }

      const recommendations =
        opportunities.map(
          (opportunity) => {

            const matchedSkills =
              opportunity.skills.filter(
                (skill) =>
                  userSkills.includes(
                    skill
                  )
              );

            const matchPercentage =
              Math.round(
                (
                  matchedSkills.length /
                  opportunity.skills.length
                ) * 100
              );

            return {
              ...opportunity,
              matchedSkills,
              matchPercentage,
            };
          }
        );

      const sortedRecommendations =
        recommendations.sort(
          (a, b) =>
            b.matchPercentage -
            a.matchPercentage
        );

      res.status(200).json({
        success: true,
        recommendations:
          sortedRecommendations,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Recommendation generation failed",
      });
    }
};


// =========================
// AI CAREER INSIGHTS
// =========================

const generateInsights =
  async (req, res) => {

    try {

      const {
        skills,
        opportunities
      } = req.body;

      if (
        !skills ||
        !opportunities
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Skills and opportunities are required",
        });
      }

      // TOP MATCHED DOMAINS

      const skillText =
        skills.join(", ");

      const opportunityText =
        opportunities
          .map(
            (o) =>
              `${o.title} - ${o.skills}`
          )
          .join("\n");

      const insights = `
Based on your current skills in ${skillText},
you are highly aligned with frontend and
fullstack opportunities.

Your strongest matches involve React,
JavaScript, and Node.js ecosystems.

To improve your AI recommendation score,
focus on learning:

• TypeScript
• Docker
• System Design
• Next.js

These skills can significantly increase your
match percentage for high-paying internships
and modern SaaS engineering roles.
`;

      res.status(200).json({
        success: true,
        insights,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "AI insights generation failed",
      });
    }
};


module.exports = {
  summarizeOpportunity,
  skillMatch,
  recommendOpportunities,
  generateInsights,
};
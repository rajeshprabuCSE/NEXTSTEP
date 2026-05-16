const express = require("express");

const router = express.Router();

const {
  summarizeOpportunity,
  skillMatch,
  recommendOpportunities,
  generateInsights,
} = require("../controllers/aiController");


// AI SUMMARY

router.post(
  "/summarize",
  summarizeOpportunity
);


// SKILL MATCH

router.post(
  "/match",
  skillMatch
);


// RECOMMENDATIONS

router.post(
  "/recommend",
  recommendOpportunities
);


// AI INSIGHTS

router.post(
  "/insights",
  generateInsights
);

module.exports = router;
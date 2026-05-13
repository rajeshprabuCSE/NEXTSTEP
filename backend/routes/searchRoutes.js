const express = require("express");

const router = express.Router();

const {
  searchOpportunities,
  filterByCategory
} = require("../controllers/searchController");

// SEARCH ROUTE
router.get("/search", searchOpportunities);

// FILTER ROUTE
router.get("/filter", filterByCategory);

module.exports = router;
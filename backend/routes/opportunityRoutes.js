console.log("OPPORTUNITY ROUTES LOADED");
const express = require("express");

const router = express.Router();

const {
  getAllOpportunities,
  searchOpportunities,
  filterOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");


// GET ALL OPPORTUNITIES
router.get("/", getAllOpportunities);


// SEARCH OPPORTUNITIES
router.get("/search", searchOpportunities);


// FILTER OPPORTUNITIES
router.get("/filter", filterOpportunities);


// CREATE OPPORTUNITY
router.post("/", createOpportunity);


// UPDATE OPPORTUNITY
router.put("/:id", updateOpportunity);


// DELETE OPPORTUNITY
router.delete("/:id", deleteOpportunity);


module.exports = router;
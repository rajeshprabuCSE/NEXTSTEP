const express = require('express');
const router = express.Router();

const {
    searchOpportunities,
    filterOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getAllOpportunities
} = require('../controllers/opportunityController');


// SEARCH API
router.get('/search', searchOpportunities);


// FILTER API
router.get('/filter', filterOpportunities);


// POST API
router.post('/', createOpportunity);


// UPDATE API
router.put('/:id', updateOpportunity);


// DELETE API
router.delete('/:id', deleteOpportunity);


// GET ALL API
router.get('/', getAllOpportunities);


module.exports = router;
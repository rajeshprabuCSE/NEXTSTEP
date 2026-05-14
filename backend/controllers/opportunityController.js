const supabase = require('../config/supabase');


// SEARCH API
const searchOpportunities = async (req, res) => {

    const keyword = req.query.keyword;

    const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .ilike('title', `%${keyword}%`);

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.status(200).json({
        success: true,
        results: data.length,
        data
    });
};


// FILTER API
const filterOpportunities = async (req, res) => {

    const category = req.query.category;

    const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('category', category);

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.status(200).json({
        success: true,
        results: data.length,
        data
    });
};


// POST API
const createOpportunity = async (req, res) => {

    const {
        title,
        company,
        location,
        skills,
        description,
        deadline,
        apply_link,
        category,
        source
    } = req.body;

    const { data, error } = await supabase
        .from('opportunities')
        .insert([
            {
                title,
                company,
                location,
                skills,
                description,
                deadline,
                apply_link,
                category,
                source
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.status(201).json({
        success: true,
        message: 'Opportunity added successfully',
        data
    });
};


// UPDATE API
const updateOpportunity = async (req, res) => {

    const id = req.params.id;

    const {
        title,
        company,
        location,
        skills,
        description,
        deadline,
        apply_link,
        category,
        source
    } = req.body;

    const { data, error } = await supabase
        .from('opportunities')
        .update({
            title,
            company,
            location,
            skills,
            description,
            deadline,
            apply_link,
            category,
            source
        })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.status(200).json({
        success: true,
        message: `Opportunity with ID ${id} updated successfully`,
        data
    });
};


// DELETE API
const deleteOpportunity = async (req, res) => {

    const id = req.params.id;

    const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.status(200).json({
        success: true,
        message: `Opportunity with ID ${id} deleted successfully`
    });
};


// GET ALL API
const getAllOpportunities = async (req, res) => {

    const { data, error } = await supabase
        .from('opportunities')
        .select('*');

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.status(200).json({
        success: true,
        count: data.length,
        data
    });
};


module.exports = {
    searchOpportunities,
    filterOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getAllOpportunities
};
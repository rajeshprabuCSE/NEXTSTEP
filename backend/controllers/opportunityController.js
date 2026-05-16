const supabase = require("../config/supabase");


// GET ALL OPPORTUNITIES
const getAllOpportunities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*");

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// SEARCH API
const searchOpportunities = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .ilike("title", `%${keyword}%`);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// FILTER API
const filterOpportunities = async (req, res) => {
  try {
    const category = req.query.category;

    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("category", category);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// POST API
const createOpportunity = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      skills,
      description,
      deadline,
      apply_link,
      category,
      source,
    } = req.body;

    const { data, error } = await supabase
      .from("opportunities")
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
          source,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Opportunity added successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// UPDATE API
const updateOpportunity = async (req, res) => {
  try {
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
      source,
    } = req.body;

    const { data, error } = await supabase
      .from("opportunities")
      .update({
        title,
        company,
        location,
        skills,
        description,
        deadline,
        apply_link,
        category,
        source,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: `Opportunity with ID ${id} updated successfully`,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// DELETE API
const deleteOpportunity = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } = await supabase
      .from("opportunities")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: `Opportunity with ID ${id} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


module.exports = {
  getAllOpportunities,
  searchOpportunities,
  filterOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
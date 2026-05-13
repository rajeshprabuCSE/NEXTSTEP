const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// SEARCH OPPORTUNITIES
const searchOpportunities = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .ilike("title", `%${keyword}%`);

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// FILTER OPPORTUNITIES
const filterByCategory = async (req, res) => {
  try {
    const category = req.query.category;

    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("category", category);

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  searchOpportunities,
  filterByCategory
};
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const getAllOpportunities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*");

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  getAllOpportunities
};
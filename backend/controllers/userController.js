const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// SAVE BOOKMARK
const saveBookmark = async (req, res) => {
  try {
    const { user_id, opportunity_id } = req.body;

    const { data, error } = await supabase
      .from("bookmarks")
      .insert([
        {
          user_id,
          opportunity_id
        }
      ]);

    if (error) throw error;

    res.json({
      message: "Bookmark saved successfully",
      data
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// GET ALL BOOKMARKS
const getBookmarks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*");

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// SAVE APPLICATION
const saveApplication = async (req, res) => {
  try {
    const { user_id, opportunity_id, status } = req.body;

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          user_id,
          opportunity_id,
          status
        }
      ]);

    if (error) throw error;

    res.json({
      message: "Application saved successfully",
      data
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// GET APPLICATIONS
const getApplications = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("applications")
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
  saveBookmark,
  getBookmarks,
  saveApplication,
  getApplications
};
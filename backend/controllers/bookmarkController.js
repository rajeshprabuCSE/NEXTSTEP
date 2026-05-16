const supabase = require("../config/supabase");


// GET USER BOOKMARKS
const getBookmarks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookmarks")
      .select(`
        id,
        opportunities (*)
      `);

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


// ADD BOOKMARK
const addBookmark = async (req, res) => {
  try {
    const { opportunity_id } = req.body;

    const { data, error } = await supabase
      .from("bookmarks")
      .insert([
        {
          opportunity_id,
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
      message: "Bookmark added",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// DELETE BOOKMARK
const removeBookmark = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } = await supabase
      .from("bookmarks")
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
      message: "Bookmark removed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
};
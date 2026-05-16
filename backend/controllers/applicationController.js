const supabase =
  require("../config/supabase");


// GET APPLICATIONS

const getApplications =
  async (req, res) => {

    try {

      const { data, error } =
        await supabase
          .from("applications")
          .select(`
            id,
            status,
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
        data,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };


// ADD APPLICATION

const addApplication =
  async (req, res) => {

    try {

      const {
        user_id,
        opportunity_id,
        status,
      } = req.body;

      const { data, error } =
        await supabase
          .from("applications")
          .insert([
            {
              user_id,
              opportunity_id,
              status,
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
        message:
          "Application tracked",
        data,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };


// UPDATE STATUS

const updateApplication =
  async (req, res) => {

    try {

      const id = req.params.id;

      const { status } = req.body;

      const { data, error } =
        await supabase
          .from("applications")
          .update({ status })
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
        message:
          "Status updated",
        data,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };


// DELETE

const removeApplication =
  async (req, res) => {

    try {

      const id = req.params.id;

      const { error } =
        await supabase
          .from("applications")
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
        message:
          "Application removed",
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };


module.exports = {
  getApplications,
  addApplication,
  updateApplication,
  removeApplication,
};
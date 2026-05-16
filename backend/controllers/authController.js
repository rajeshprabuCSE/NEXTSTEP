const supabase = require("../config/supabase");

const bcrypt = require("bcryptjs");


// =========================
// SIGNUP
// =========================

const signupUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // CHECK EXISTING USER

    const {
      data: existingUser
    } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();


    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }


    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    // INSERT USER

    const {
      data,
      error
    } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password:
            hashedPassword,
        },
      ])
      .select();


    if (error) {

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }


    // SUCCESS RESPONSE

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",

      user: data[0],
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// =========================
// LOGIN
// =========================

const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;


    // FIND USER

    const {
      data: user,
      error
    } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();


    if (!user || error) {

      return res.status(400).json({
        success: false,
        message:
          "User not found",
      });
    }


    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid password",
      });
    }


    // SUCCESS RESPONSE

    res.status(200).json({
      success: true,
      message:
        "Login successful",

      user: user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


module.exports = {
  signupUser,
  loginUser,
};
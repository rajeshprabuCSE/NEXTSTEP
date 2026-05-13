const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ROUTES
const opportunityRoutes = require("./routes/opportunityRoutes");
const searchRoutes = require("./routes/searchRoutes");
const userRoutes = require("./routes/userRoutes");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "NEXTSTEP Backend Running Successfully"
  });
});

// API ROUTES
app.use("/opportunities", opportunityRoutes);
app.use("/", searchRoutes);
app.use("/", userRoutes);

// SERVER PORT
const PORT = process.env.PORT || 5000;

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
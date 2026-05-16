require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// ROUTES
// =========================

const opportunityRoutes =
  require("./routes/opportunityRoutes");

const authRoutes =
  require("./routes/authRoutes");

const bookmarkRoutes =
  require("./routes/bookmarkRoutes");

const applicationRoutes =
  require("./routes/applicationRoutes");

const aiRoutes =
  require("./routes/aiRoutes");


// =========================
// API ROUTES
// =========================

app.use(
  "/api/opportunities",
  opportunityRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/bookmarks",
  bookmarkRoutes
);

app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {

  res.send(
    "NEXTSTEP Backend Running..."
  );

});


// =========================
// SERVER
// =========================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
const express = require("express");

const router = express.Router();

const {
  getApplications,
  addApplication,
  updateApplication,
  removeApplication,
} = require(
  "../controllers/applicationController"
);


// =========================
// GET APPLICATIONS
// =========================

router.get(
  "/",
  getApplications
);


// =========================
// ADD APPLICATION
// =========================

router.post(
  "/",
  addApplication
);


// =========================
// UPDATE STATUS
// =========================

router.put(
  "/:id",
  updateApplication
);


// =========================
// DELETE APPLICATION
// =========================

router.delete(
  "/:id",
  removeApplication
);


module.exports = router;
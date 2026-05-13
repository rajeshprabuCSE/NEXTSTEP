const express = require("express");

const router = express.Router();

const {
  saveBookmark,
  getBookmarks,
  saveApplication,
  getApplications
} = require("../controllers/userController");

// BOOKMARK ROUTES
router.post("/bookmarks", saveBookmark);
router.get("/bookmarks", getBookmarks);

// APPLICATION ROUTES
router.post("/applications", saveApplication);
router.get("/applications", getApplications);

module.exports = router;
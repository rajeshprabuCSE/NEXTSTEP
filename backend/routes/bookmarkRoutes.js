const express = require("express");

const router = express.Router();

const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");


// GET BOOKMARKS
router.get("/", getBookmarks);


// ADD BOOKMARK
router.post("/", addBookmark);


// DELETE BOOKMARK
router.delete("/:id", removeBookmark);


module.exports = router;
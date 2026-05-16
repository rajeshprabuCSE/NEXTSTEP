import axios from "axios";

const API =
  "http://localhost:5000/api/bookmarks";


// =========================
// FETCH BOOKMARKS
// =========================

export const fetchBookmarks =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
  };


// =========================
// ADD BOOKMARK
// =========================

export const addBookmark =
  async (bookmarkData) => {

    const response =
      await axios.post(
        API,
        bookmarkData
      );

    return response.data;
  };


// =========================
// REMOVE BOOKMARK
// =========================

export const removeBookmark =
  async (id) => {

    const response =
      await axios.delete(
        `${API}/${id}`
      );

    return response.data;
  };
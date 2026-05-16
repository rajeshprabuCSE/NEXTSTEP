import { useEffect, useState } from "react";

import {
  fetchBookmarks,
  removeBookmark,
} from "../services/bookmarkService";

export default function Bookmarks() {

  const [bookmarks, setBookmarks] =
    useState([]);


  // =========================
  // LOAD BOOKMARKS
  // =========================

  const loadBookmarks = async () => {

    try {

      const data =
        await fetchBookmarks();

      setBookmarks(data.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    loadBookmarks();

  }, []);


  // =========================
  // REMOVE BOOKMARK
  // =========================

  const handleRemove = async (id) => {

    try {

      await removeBookmark(id);

      alert("Bookmark Removed");

      loadBookmarks();

      // refresh dashboard state
      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed to remove");
    }
  };


  return (

    <div className="dashboard-container">

      <div className="main-content">

        <h1 className="bookmark-title">
          Saved Opportunities
        </h1>


        {bookmarks.length === 0 ? (

          <div className="empty-state">

            <h2>No Saved Opportunities</h2>

            <p>
              Save opportunities from
              dashboard to manage them
              here.
            </p>

          </div>

        ) : (

          <div className="opportunities-grid">

            {bookmarks.map((item) => (

              <div
                className="opportunity-card"
                key={item.id}
              >

                <div className="tag">
                  {
                    item.opportunities?.category
                  }
                </div>


                <h2>
                  {
                    item.opportunities?.title
                  }
                </h2>


                <h4>
                  {
                    item.opportunities?.company
                  }
                </h4>


                <p>
                  {
                    item.opportunities?.location
                  }
                </p>


                <div className="card-footer">

                  <a
                    href={
                      item.opportunities
                        ?.apply_link
                    }
                    target="_blank"
                    rel="noreferrer"
                  >

                    <button className="edit-btn">
                      Apply
                    </button>

                  </a>


                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleRemove(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
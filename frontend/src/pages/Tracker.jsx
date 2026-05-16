import { useEffect, useState } from "react";

import {
  fetchApplications,
  updateApplication,
  removeApplication,
} from "../services/applicationService";

export default function Tracker() {

  const [applications, setApplications] =
    useState([]);


  // =========================
  // LOAD APPLICATIONS
  // =========================

  const loadApplications =
    async () => {

      try {

        const data =
          await fetchApplications();

        setApplications(data.data);

      } catch (error) {

        console.log(error);
      }
    };


  useEffect(() => {

    loadApplications();

  }, []);


  // =========================
  // UPDATE STATUS
  // =========================

  const handleStatusChange =
    async (id, status) => {

      try {

        await updateApplication(
          id,
          status
        );

        loadApplications();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update"
        );
      }
    };


  // =========================
  // REMOVE
  // =========================

  const handleRemove =
    async (id) => {

      try {

        await removeApplication(id);

        loadApplications();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to remove"
        );
      }
    };


  return (

    <div className="dashboard-container">

      <div className="main-content">

        <h1 className="bookmark-title">
          Application Tracker
        </h1>


        {applications.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Applications Yet
            </h2>

            <p>
              Start applying to
              opportunities to track
              them here.
            </p>

          </div>

        ) : (

          <div className="opportunities-grid">

            {applications.map(
              (item) => (

                <div
                  className="opportunity-card"
                  key={item.id}
                >

                  <div className="tag">

                    {
                      item.status
                    }

                  </div>


                  <h2>

                    {
                      item.opportunities
                        ?.title
                    }

                  </h2>


                  <h4>

                    {
                      item.opportunities
                        ?.company
                    }

                  </h4>


                  <div
                    style={{
                      marginTop: "20px"
                    }}
                  >

                    <select
                      value={
                        item.status
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          e.target.value
                        )
                      }
                    >

                      <option>
                        Applied
                      </option>

                      <option>
                        Interview
                      </option>

                      <option>
                        Rejected
                      </option>

                      <option>
                        Accepted
                      </option>

                    </select>

                  </div>


                  <div
                    className="card-footer"
                  >

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleRemove(
                          item.id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}
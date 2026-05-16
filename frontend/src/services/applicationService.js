import axios from "axios";

const API =
  "http://localhost:5000/api/applications";


// =========================
// FETCH APPLICATIONS
// =========================

export const fetchApplications =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
  };


// =========================
// ADD APPLICATION
// =========================

export const addApplication =
  async (applicationData) => {

    const response =
      await axios.post(
        API,
        applicationData
      );

    return response.data;
  };


// =========================
// UPDATE APPLICATION
// =========================

export const updateApplication =
  async (id, status) => {

    const response =
      await axios.put(
        `${API}/${id}`,
        { status }
      );

    return response.data;
  };


// =========================
// REMOVE APPLICATION
// =========================

export const removeApplication =
  async (id) => {

    const response =
      await axios.delete(
        `${API}/${id}`
      );

    return response.data;
  };
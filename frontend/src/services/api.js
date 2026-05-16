const API_BASE_URL = "http://localhost:5000/api/opportunities";

// FETCH ALL OPPORTUNITIES
export const fetchOpportunities = async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch opportunities");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

// SEARCH OPPORTUNITIES
export const searchOpportunities = async (keyword) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search?keyword=${keyword}`
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};

// FILTER OPPORTUNITIES
export const filterOpportunities = async (category) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/filter?category=${category}`
    );

    if (!response.ok) {
      throw new Error("Filter failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Filter Error:", error);
    return [];
  }
};

// ADD OPPORTUNITY
export const addOpportunity = async (opportunityData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opportunityData),
    });

    if (!response.ok) {
      throw new Error("Failed to add opportunity");
    }

    return await response.json();
  } catch (error) {
    console.error("Add Error:", error);
  }
};

// DELETE OPPORTUNITY
export const deleteOpportunity = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Delete Error:", error);
  }
};

// UPDATE OPPORTUNITY
export const updateOpportunity = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Update Error:", error);
  }
};
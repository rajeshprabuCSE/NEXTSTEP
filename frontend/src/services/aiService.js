import axios from "axios";

const API =
  "http://localhost:5000/api/ai";

export const generateSummary =
  async (description) => {

    try {

      const response =
        await axios.post(
          `${API}/summarize`,
          { description }
        );

      return response.data.summary;

    } catch (error) {

      console.log(error);

      return "AI summary unavailable";
    }
};
export const generateInsights =
  async (payload) => {

    try {

      const response =
        await axios.post(
          `${API}/insights`,
          payload
        );

      return response.data.insights;

    } catch (error) {

      console.log(error);

      return "AI insights unavailable";
    }
};
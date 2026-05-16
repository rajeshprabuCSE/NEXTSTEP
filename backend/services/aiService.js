const axios = require("axios");

const generateAISummary = async (text) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize this opportunity professionally in 2 short lines:\n\n${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "NEXTSTEP",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(
      "FULL AI ERROR:",
      error.response?.data || error.message
    );

    return "Summary unavailable";
  }
};

module.exports = {
  generateAISummary,
};
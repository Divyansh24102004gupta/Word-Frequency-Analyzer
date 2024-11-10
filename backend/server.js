const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/analyze", async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url); // Fetch HTML content
    const $ = cheerio.load(data); // Parse HTML

    // Extract and clean text
    const text = $("body")
      .text()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase();

    // Calculate word frequencies
    const wordCount = {};
    text.split(" ").forEach((word) => {
      if (word.length > 1) {
        // Ignore one-letter words
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    // Sort and get top n words
    const topWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Top 10 words

    res.json(topWords); // Send back the top words
  } catch (err) {
    res.status(500).send("Error fetching URL");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

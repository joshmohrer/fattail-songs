const express = require("express");
const app = express();
import axios from "axios";

app.get("/api/search", async (req, res) => {
  const { q, limit } = req.query;
  const url = `https://api.deezer.com/search?q=${q}&limit=${limit}`;
  const response = await axios.get(url);
  res.json(response.data);
});

app.listen(3005, () => {
  console.log("Server listening on port 3005");
});

const express = require("express");
require("dotenv").config();
require("colors");

const app = express();

const { PORT } = process.env;

const port = PORT || 8000;

app.get("/", (req, res) => {
  res.status = 200;
  res.json({ message: "Hello world" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.cyan);
});

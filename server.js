const express = require("express");
const createError = require("http-errors");
require("dotenv").config();
require("colors");

const { PORT } = process.env;
const port = PORT || 8000;

const app = express();

app.get("/", (req, res) => {
  const { name } = req.query;

  if (name) {
    res.status(200).json({ message: `Hello, ${name}!` });
  } else {
    res.status(200).json({ message: "Hello world" });
  }
});

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send JSON response for errors
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.cyan);
});

const createError = require("http-errors");

// Catch 404 errors and forward to error handler
const catch404 = (req, res, next) => {
  next(createError(404));
};

// Error Handler
const errorHandler = (err, req, res, next) => {
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
};

module.exports = { catch404, errorHandler };

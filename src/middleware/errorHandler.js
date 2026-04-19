// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unexpected application error', message: err.message });
};
module.exports = errorHandler;

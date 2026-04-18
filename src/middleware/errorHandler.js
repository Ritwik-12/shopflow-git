// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
<<<<<<< HEAD
  res.status(500).json({ error: 'Server Error Occured', message: err.message });
=======
  res.status(500).json({ error: 'Unexpected application error', message: err.message });
>>>>>>> 9d788df (fix(error):clarify error message for client)
};
module.exports = errorHandler;

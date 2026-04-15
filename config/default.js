module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/shopflow',
};

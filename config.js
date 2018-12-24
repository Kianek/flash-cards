module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  URL: process.env.BASE_URL || 'http://localhost:5000',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
  MONGO_URI:
    process.env.MONGO_URI ||
    'mongodb://keanu:password123@ds243054.mlab.com:43054/flash-cards',
};

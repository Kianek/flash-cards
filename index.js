const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const logger = require('morgan');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());
server.use(logger('combined'));

// Protect Routes
// server.use(
//   rjwt({ secret: config.JWT_SECRET }).unless({
//     path: ['/api/users/login', '/api/users/register'],
//   })
// );

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    config.MONGO_URI,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;
db.on('error', err => console.log(err));

db.once('open', () => {
  require('./routes/users')(server);
  require('./routes/collections')(server);
  console.log(`Server running on port ${config.PORT}`);
});

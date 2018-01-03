// monogoose connect
var mongoose = require('mongoose');
var config = require('config');

var mconnect = function(){
  // User native Promises
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    log.error('Mongoose connection error:' + err);
  })
  mongoose.connection.on('disconnected', () => {
    log.info('Mongoose connection disconnected');
  })
  mongoose.connection.on('connected', () => {
    log.info('Mongoose connected');
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(() => {
      log.info('Mongoose connection disconnected through app termination');
      process.exit(0);
    })
  })

  mongoose.connect(`${config.get('mongo_url')}${config.get('mongo_dbs.proj1')}`)
  .then(() => {
    log.info('Connected')
  })
  .catch((err) => {
    log.error(err.message);
  });
};

module.exports = mconnect;
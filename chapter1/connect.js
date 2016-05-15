var mongodb = require('mongodb');
var uri = 'mongodb://localhost:27017/test';

module.exports = function(callback) {
  mongodb.MongoClient.connect(uri, callback);
};

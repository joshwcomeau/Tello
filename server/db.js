const nconf = require('nconf');
const { MongoClient } = require('mongodb');

module.exports = new Promise((resolve, reject) => {
  MongoClient.connect(nconf.get('MONGO_URL'), (err, database) => {
    if (err) {
      return reject(err);
    }

    resolve(database);
  });
});

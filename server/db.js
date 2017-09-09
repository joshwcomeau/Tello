const nconf = require('nconf');
const mongoose = require('mongoose');

mongoose.connect(nconf.get('MONGO_URL'));

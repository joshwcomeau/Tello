const fs = require('fs');

const nconf = require('nconf');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./initialize');


const databaseConnection = require('./db');


const app = express();

app.set('port', nconf.get('PORT') || 3005);


require('./config/passport')(passport);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));


app.get(
  '/auth/google',
  passport.authenticate('google', { scope : ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
  })
);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

databaseConnection.then(db => {
  app.listen(nconf.get('PORT'), () => {
    console.info(`==> 🌎  Listening on port ${nconf.get('PORT')}.`);
  });
}).catch(err => {
  console.error('Error connecting to database', err);
});

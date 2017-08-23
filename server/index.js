const fs = require('fs');

const nconf = require('nconf');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./initialize');



const app = express();

app.set('port', nconf.get('PORT') || 3005);

app.use(passport.initialize());

require('./config/passport')(passport);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));



app.get(
  '/auth/google',
  passport.authenticate('google', { scope : ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    // On localhost, this API runs on port 3005.
    // The actual dev webserver is on 3000, though.
    // Because of that, I can't simply set a cookie to pass the login token
    // to the client :/
    // That said, the token is JWT, and so there's really no harm in just
    // passing it with the URL.
    // TODO: Maybe use headers for this?
    const {token} = req.user;

    return res.redirect(`${nconf.get('WEB_URL')}?token=${token}`);
  }
);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.listen(nconf.get('PORT'), () => {
  console.info(`==> 🌎  Listening on port ${nconf.get('PORT')}.`);
});

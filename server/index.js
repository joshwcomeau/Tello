const fs = require('fs');

const nconf = require('nconf');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./initialize');

const { User } = require('./models/User.model')


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
    const {token} = req.user;

    if (process.env.NODE_ENV === 'development') {

      return res.redirect(
        `${nconf.get('WEB_URL')}/auth/google/callback?token=${token}`
      );
    }

    res.cookie(nconf.get('AUTH_TOKEN_KEY'), token);

    return res.redirect('/');
  }
);

app.get('/users/me', (req, res, next) => {
  const bearerTokenHeader = req.header('Authorization');

  if (typeof bearerTokenHeader !== 'string') {
    return next(new Error('Please provide a bearer token with this request.'));
  }

  const token = bearerTokenHeader.replace(/^Bearer\s/i, '')

  User.findOne({ token }, (err, user) => {
    if (err) {
      return next(err);
    }

    // If no user was found, it means the account was deleted.
    // let's return null, the client can then delete the token.
    if (!user) {
      return next(err);
    }

    // The user object we return should be a simplified version of the DB record.
    // TODO: Move this somewhere?
    const simplifiedUser = {
      name: user.name,
      email: user.email,
      trackedShows: user.trackedShows,
      id: user._id,
    };

    return res.json(simplifiedUser);
  });
})

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.listen(nconf.get('PORT'), () => {
  console.info(`==> 🌎  Listening on port ${nconf.get('PORT')}.`);
});

const fs = require('fs');

const nconf = require('nconf');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./initialize');
require('./db');

const { getPublicUser } = require('./models/User.model');
const { authenticatedRoute, jwtAuthentication } = require('./middleware');


const app = express();

app.set('port', nconf.get('PORT') || 3005);

app.use(passport.initialize());

require('./config/passport')(passport);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));


// This middleware looks for an `Authentication` header, and turns it into
// a User object (stored on req.user).
app.use(jwtAuthentication);


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

    // Make it a 5-year cookie
    const cookieExpirationDate = new Date(
      Date.now() + 2 * 365 * 24 * 60 * 60 * 1000
    );

    res.cookie(
      nconf.get('AUTH_TOKEN_KEY'),
      token,
      { expires: cookieExpirationDate }
    );

    return res.redirect('/');
  }
);

app.get('/users/me', authenticatedRoute, (req, res, next) => {
  return res.json(req.user.getPublic());
});

app.post('/shows/create', authenticatedRoute, (req, res, next) => {
  req.user.addShows(req.body.shows, (err, user) => {
    const shows = user.trackedShows
      .filter(show => req.body.shows.find(({id}) => id === show._id))
      .map(show => show.getPublic());

    return res.json({ shows });
  });
});

app.patch(
  '/shows/:showId/episodes',
  authenticatedRoute,
  (req, res, next) => {
    const { markAs, episodeIds } = req.body;

    // Convert our URL param back to a number.
    const showId = Number(req.params.showId);

    req.user.toggleEpisodes({ markAs, showId, episodeIds }, (err, result) => {
      if (err) {
        return next(err);
      }

      return res.json({ ok: true });
    });
  }
);

app.delete('/shows/:showId', authenticatedRoute, (req, res, next) => {
  // Convert our URL param back to a number.
  const showId = Number(req.params.showId);

  req.user.deleteShow({ showId }, (err, result) => {
    if (err) {
      return next(err);
    }

    return res.json({ showId });
  });
});


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.listen(nconf.get('PORT'), () => {
  console.info(`==> 🌎  Listening on port ${nconf.get('PORT')}.`);
});

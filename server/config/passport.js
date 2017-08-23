const nconf = require('nconf');
const cookie = require('cookie');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../models/User.model');


module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    databaseConnection.then(db => {
      db.collection('users').findOne({ _id: id }, done)
    });
  });

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(new GoogleStrategy({
    clientID: nconf.get('GOOGLE_CLIENT_ID'),
    clientSecret: nconf.get('GOOGLE_CLIENT_SECRET'),
    callbackURL: nconf.get('GOOGLE_CALLBACK_URL'),
  }, (token, refreshToken, profile, done) => {
    console.log("PASSPORT GOT STUFF", profile);

    cookie.serialize('someThing', 'someVal');

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(() => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        // if a user is found, log them in
        if (user) {
          console.log('FOUND USER', user)
          return done(null, user);
        }

        // If no user is found, create a new user.
        const userEmail = (
          profile.emails &&
          profile.emails[0] &&
          profile.emails[0].value
        );

        User.create({
          name: profile.displayName,
          googleId: profile.id,
          googleToken: profile.token,
          email: userEmail,
          shows: [],
        }, (err, newUser) => {
          if (err) {
            return done(err);
          }

          console.log('CREATED USER', newUser);

          return done(null, newUser);
        });
      });
    });
  }));
};

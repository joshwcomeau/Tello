const nconf = require('nconf');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const { User } = require('../models/User.model');


module.exports = (passport) => {
  // NOTE: I don't think I'm actually using this serializer, since I use JWTs
  // independently. Sadly, passport complains if they aren't defined, though.
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => User.findById(id, done));

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(new GoogleStrategy({
    clientID: nconf.get('GOOGLE_CLIENT_ID'),
    clientSecret: nconf.get('GOOGLE_CLIENT_SECRET'),
    callbackURL: nconf.get('GOOGLE_CALLBACK_URL'),
  }, (token, refreshToken, profile, done) => {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    // TODO: Is this actually necessary?!
    // TODO: Move the user-fetching stuff to a helper somewhere.
    process.nextTick(() => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        // if a user is found, log them in
        if (user) {
          return done(null, user);
        }

        // If no user is found, create a new user.
        const userEmail = (
          profile.emails &&
          profile.emails[0] &&
          profile.emails[0].value
        );

        // Create a JWT token for them to authenticate with, and store it
        // in with the user.
        // TODO: Encrypt it, since this token is essentially a password.
        const userId = uuidv4();
        const token = jwt.sign(userId, nconf.get('JWT_SECRET'));

        User.create({
          token,
          name: profile.displayName,
          googleId: profile.id,
          email: userEmail,
          shows: [],
        }, (err, newUser) => {
          if (err) {
            return done(err);
          }

          return done(null, newUser);
        });
      });
    });
  }));
};

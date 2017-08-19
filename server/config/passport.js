const nconf = require('nconf');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { MongoClient } = require('mongodb');

const databaseConnection = require('../db');

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
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(() => {
      databaseConnection.then(db => {
        const query = { 'google.id': profile.id };

        db.collection('users').findOne(query, (err, user) => {
          if (err) {
            return done(err);
          }

          // if a user is found, log them in
          if (user) {
            return done(null, user);
          }

          // If no user is found, create a new user.
          console.log('PROFILE', profile);
        });
      });

      // // try to find the user based on their google id
      // User.findOne({ 'google.id' : profile.id }, function(err, user) {
      //   if (err)
      //     return done(err);
      //
      //   if (user) {
      //
      //     // if a user is found, log them in
      //     return done(null, user);
      //   } else {
      //     // if the user isnt in our database, create a new user
      //     var newUser          = new User();
      //
      //     // set all of the relevant information
      //     newUser.google.id    = profile.id;
      //     newUser.google.token = token;
      //     newUser.google.name  = profile.displayName;
      //     newUser.google.email = profile.emails[0].value; // pull the first email
      //
      //     // save the user
      //     newUser.save(function(err) {
      //       if (err)
      //         throw err;
      //       return done(null, newUser);
      //     });
      //   }
      // });
    });

  }));

};

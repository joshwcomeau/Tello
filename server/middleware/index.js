const { User } = require('../models/User.model');

module.exports.jwtAuthentication = (req, res, next) => {
  const bearerTokenHeader = req.header('Authorization');

  // If there is no Authorization header, it means this is an un-authed request.
  // Move along; no ham, no fowl.
  if (!bearerTokenHeader) {
    return next();
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

    req.user = user;
    return next();
  });

}

module.exports.authenticatedRoute = (req, res, next) => {
  if (!req.user) {
    return next(
      new Error('Sorry! You need to be logged in to access this endpoint.')
    );
  }

  return next();
}

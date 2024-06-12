const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { findOrCreateUser } = require("../services/user.service");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:4444/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log("profile", profile, "token:-->", accessToken);
        try {
          const user = await findOrCreateUser(profile);
          console.log("user", user);
          return cb(null, user);
        } catch (err) {
          return cb(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};

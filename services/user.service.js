const User = require("../model/user.model");

async function findOrCreateUser(profile) {
  const user = await User.findOne({ email: profile.emails[0].value });
   console.log('userssss',user);
  if (user) {
    return user;
  } else {
    const newUser = new User({
      userName: profile.displayName,
      email: profile.emails[0].value,
      password: "google-oauth", // Placeholder for users authenticated via Google
    });
    await newUser.save();
    return newUser;
  }
}

module.exports = { findOrCreateUser };

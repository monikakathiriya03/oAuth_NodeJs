const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const routes = require("./routes/user.routes");

app.use(express.json());
app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passportConfig")(passport);

app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGO_DB_URL )
    .then(() => console.log("DB is connected..."))
    .catch((err) => console.log(err.message));

  console.log(`Server started at http://localhost:${port}`);
});






// -------> COMPLATE CODE IN SINGLE FILE <-------

// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const ejs = require("ejs");
// const path = require("path");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT;

// app.use(express.json());
// app.use(morgan("dev"));

// app.set("view engine", "ejs");

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       return cb(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, cb) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   done(null, obj);
// });

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/login", (req, res) => {
//   res.render(path.join(__dirname, "login.ejs"));
// });

// app.get("/dashboard", (req, res) => {
//   if (req.isAuthenticated()) {
//     // console.log(req.user);
//     res.render(path.join(__dirname, "dashboard.ejs"), { user: req.user });
//   } else {
//     res.redirect("/login");
//   }
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   async (req, res) => {
//     res.redirect("/dashboard");
//   }
// );

// app.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if(err) {
//       console.log(err);
//       // return res.redirect("/login");
//     }else{
//       res.redirect("/login");
//     }
//   });
// });

// app.listen(port, () => {
//   async function main() {
//     await mongoose.connect(process.env.MONGO_DB_URL);
//   }
//   main()
//     .then(() => console.log("DB is connected..."))
//     .catch((err) => console.log(err.message));

//   console.log(`Server start at http://localhost:${port}`);
// });

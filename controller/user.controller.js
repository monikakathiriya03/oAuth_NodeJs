const authService = require("../services/user.service");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getDashboard = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard", { user: req.user });
  } else {
    res.redirect("/login");
  }
};

exports.googleCallback = (req, res) => {
  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
};

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getLogin,
  getDashboard,
  googleCallback,
  logout,
} = require("../controller/user.controller");

router.get("/login", getLogin);
router.get("/dashboard", getDashboard);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

router.get("/logout", logout);

module.exports = router;

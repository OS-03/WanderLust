const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(wrapAsync(userController.showsignupPage))
  .post(wrapAsync(userController.signupForm));
  
router
  .route("/login")
  .get(wrapAsync(userController.showloginPage))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginForm
  );

router.get("/logout", userController.logout);

module.exports = router;

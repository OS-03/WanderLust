const User = require("../models/user.js");
module.exports.showsignupPage = async (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signupForm = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User Registered Successfully");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.showloginPage = async (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginForm = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust you are logged In");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You Logged Out Successfully");
    res.redirect("/listings");
  });
};

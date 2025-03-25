const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
dotenv.config();
const favicon = require('serve-favicon');
const MongoStore = require('connect-mongo');
// const logger = require('morgan');
const bodyParser = require("body-parser");
//middleware to show static files
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.json()); // Parses JSON data
app.use(methodoverride("_method"));
app.use(cors());
app.engine("ejs", ejsMate);
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,                 //notupdate session again and again
});

store.on("error",(err)=>{
  console.log("ERROR in MONGO SESSION STORE",err)
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, //crossscripting attack is secured
  },
};

const start = async () => {
  await mongoose.connect(process.env.ATLAS_URL);
};
start()
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, '/public/favicon/', 'favicon.ico')))
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  // next(new ExpressError(404, "Page Not Found!"));
  res.render('pagenotfound.ejs');
});

// error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
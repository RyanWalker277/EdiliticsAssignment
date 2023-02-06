const express = require('express');
const { connect } = require('http2');
const path = require('path');
const app = express()
const port = 3000
const passport = require("passport");
require("dotenv").config();
require("./src/config/google");

const flash = require("express-flash");
const session = require("express-session");

app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use('/static' , express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/templates/home/index.html'));
})

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname+'/templates/home/form.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// connect to mongodb

const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/assignment";
mongoose.connect(
  db,
  (error) => {
    if (error) console.log(error);
  }
);

app.use(passport.initialize());
app.use(passport.session());

require("./src/config/passport");
require("./src/config/google");

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  })
);
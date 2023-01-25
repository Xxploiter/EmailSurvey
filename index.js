const express = require("express");
const mongoose = require('mongoose')
const key = require("./config/key");
mongoose.connect(key.mongoURI)
// modules needed for cookies 
const cookieSession = require('cookie-session')
// we need to tell passport to keep track of the cookie so we need the passport module aswell
const passport = require('passport')
// cookie module ends here

require('./models/User')//always remember the position of the require statements matter
require('./services/passport')//initializes passport js for Oauth and we are checkin here if user already exists

// const authRoutes = require('./routes/authRoutes');
const app = express();

// here goes the code for cookies
app.use(
    cookieSession({
        maxAge: 30*4*60*60*1000, //30 days in mmiliseconds
        keys: [key.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())
// cookie code ends here
// authRoutes(app)
require('./routes/authRoutes')(app)//

const PORT = process.env.PORT || 5000;
app.listen(PORT);

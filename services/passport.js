const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose')
const key = require("../config/key");

const User = mongoose.model('users')

passport.use(
    new googleStrategy(
      {
        clientID: key.googleClientID,
        clientSecret: key.googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);

        User.findOne({googleId: profile.id}).then((userExists)=>{ //userExists is an single mongoose instance or a record
          if(userExists){//if true we already have a user with this googleID
            done(null,userExists)
          }else{ // this user is logging in for the first time
            new User({googleId: profile.id}).save().then((user) => done(null,user)) //we create a new user record and save it

          }
        })
       
      }
    )
  );
  
  passport.serializeUser((user, done)=>{ 
    console.log('serializeUser ran'); // here we are trying to fetch the literal user id of this record not the 
     done(null, user.id)  //google id as user might use diff oauth like linkedin or github 
   }) //but user id remains same that is the id of the user given by mongoDb to the record
   //IMP above will be used for creating cookies
   
   passport.deserializeUser((id, done)=>{ //this function is ran to check wether the returned id from the 
     User.findById(id).then((user)=>{ //cookie is valid or not by fetching the data from mongoDb and verifying
       console.log('deserializeUser ran');
       done(null, user)
     })
   })
   
const passport = require("passport");
module.exports = (app) =>{
    app.get(
        "/auth/google",
        passport.authenticate("google", {
          scope: ["profile", "email"],
        })
      );
      //now bellow code gets the user profile information
    app.get('/auth/google/callback', passport.authenticate('google'))
    app.get('/api/logout', (req,res)=>{
      req.logout(
        res.send(req.user.loginStatus = 'you are logged')
      )
    })
    app.get('/api/currentUser', (req,res)=>{
      res.send(req.user)
    })
      
}
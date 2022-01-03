require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require("./models")
const User = db.users;


passport.serializeUser(function(user, done) {
  done(null, user);
  });
  
passport.deserializeUser(function(id, done) {
  //console.log(id);
  User.findByPk(id.id)
  .then(user => {
    //console.log(user)
    done(null, user.dataValues);
  })
  .catch(e => {
    //console.log(e)
    done(new Error("Failed to deserialize an user"));
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, cb) {

    const currentUser = await User.findOne({
      where : {email : profile._json.email}
    });

    if(!currentUser){
      const newUser = await User.create({
        name: profile._json.name,
        email : profile._json.email
      })
      if(newUser){
        //console.log(newUser)
        return cb(null, newUser.dataValues);
      }
    }
    //console.log(currentUser)
    return cb(null, currentUser.dataValues);
  }
));
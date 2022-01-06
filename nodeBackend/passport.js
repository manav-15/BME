require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require("./models")
const User = db.users;


passport.serializeUser(function(user, done) {
  //console.log(user)
  done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
  //console.log(id);
  User.findByPk(user.id)
  .then(currentUser => {
    //console.log(user)
    done(null, currentUser.dataValues);
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

    User.findOrCreate({
      where: { email: profile._json.email },
      defaults: {
        name: profile._json.name
      }
    })
    .then(([user,created])=> {
      //console.log(user.toJSON())
      return cb(null, user.dataValues);
    })
    .catch(e => {
      console.log(e);
      done(new Error(e));
    });

    

    // const currentUser = await User.findOne({
    //   where : {email : profile._json.email}
    // });

    // if(!currentUser){
    //   const newUser = await User.create({
    //     name: profile._json.name,
    //     email : profile._json.email
    //   })
    //   if(newUser){
    //     //console.log(newUser)
    //     return cb(null, newUser.dataValues);
    //   }
    // }
    // //console.log(currentUser)
    // return cb(null, currentUser.dataValues);
  }
));
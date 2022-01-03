const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
  
require('./passport');
app = express();
cors = require('cors');
bodyParser = require('body-parser');
mysql = require('mysql2');

// db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456789',
//   database: 'event_management_system'
// })

const db = require("./models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


//Configure Session Storage
app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2']
}))

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());


//Unprotected Routes
app.get('/', (req, res) => {
  res.send('<h1>Home</h1>')
});

app.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>')
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next(): res.sendStatus(401);
}

// //Protected Route.
// app.get('/profile', checkUserLoggedIn, (req, res) => {
//   //console.log(req)
//   res.send(`<h1>${req.user.name}'s Profile Page</h1>`)
// });

// Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/profile');
  }
);

//Logout
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

// routers
const eventsRouter = require('./routes/events');
const profileRouter = require('./routes/profile')


// use the modules
app.use(cors())
app.use(bodyParser.json());

//use router

app.use('/events', eventsRouter);
app.use('/profile', profileRouter)

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));
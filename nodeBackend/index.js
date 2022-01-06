const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const cookieParser = require("cookie-parser"); // parse cookie header

  
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
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 100
  
}))

// parse cookies
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}))

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());





// app.get('/failed', (req, res) => {
//   res.send('<h1>Log in Failed :(</h1>')
// });



// //Protected Route.
// app.get('/profile', checkUserLoggedIn, (req, res) => {
//   //console.log(req)
//   res.send(`<h1>${req.user.name}'s Profile Page</h1>`)
// });




// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

// routers
const eventsRouter = require('./routes/events');
const profileRouter = require('./routes/profile')
const authRouter = require('./routes/auth-routes')

// use the modules

app.use(bodyParser.json({limit: '25mb'}));

app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));
//isAuthenticated
// app.get('/auth', checkUserLoggedIn, (req,res) => {
//   res.sendStatus(200)
//   // res.json({
//   //   status: 200,
//   //   message: "User is authenticated"
//   // })
// })

//use router

app.use('/events', eventsRouter);
app.use('/profile', profileRouter);
app.use('/auth', authRouter);

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));
const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser');
  mysql = require('mysql2');

  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'event_management_system'
  })

// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

// routers
const eventsRouter = require('./routes/events');

// use the modules
app.use(cors())
app.use(bodyParser.json());

//use router
app.use('/events', eventsRouter);

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));
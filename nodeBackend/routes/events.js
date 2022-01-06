const express = require('express'),
router = express.Router();
// db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456789',
//   database: 'event_management_system'
// })

const db = require("../models")
const Event = db.events;




// get event lists
router.get('/list', async(req, res) => {
  
  const events = await Event.findAll();
  //console.log(events);

  res.json({
      status: 200,
      events,
      message: "Event lists retrieved successfully"
  })
  
  // let sql = `SELECT * FROM events`;
  // db.query(sql, function(err, data, fields) {
  //   if (err) throw err;
  //   res.json({
  //     status: 200,
  //     data,
  //     message: "Event lists retrieved successfully"
  //   })
  // })
});

//get event by id
router.get('/:id', function(req, res) {
  let id = req.params.id;
  let sql = `SELECT * FROM events  where event_id = ${id}`;
  // db.query(sql, function(err, data, fields) {
  //   if (err) throw err;
  //   res.json({
  //     status: 200,
  //     data,
  //     message: "Event retrieved successfully"
  //   })
  // })
});

// create new event
router.post('/new', async function(req, res) {

  const startTime = new Date(req.body.startDate + ' ' + req.body.startTime);
  
  const endTime = new Date(req.body.endDate + ' ' + req.body.endTime);
  // const start = new Date(2021,0,15,10,0,0);
  // const end = new Date(2021,0,25,23,59,59)
  Event.create({
    name : req.body.eventName,
    organizer: req.body.eventOrganizer,
    startTime: startTime,
    endTime: endTime,
    imageUrl: req.body.imageUrl
  }).then(event => {
    res.json({
      status: 200, 
      event,
      message: "Event added successfully"
    })
    //console.log(event)
  })
  .catch(e => {
    //console.log(e.original.sqlMessage);
    res.json({
      status: 500,
      error: e.original.sqlMessage
    })
  });

  
  //console.log(event);
  // let sql = `INSERT INTO events(event_name, image_url) VALUES (?)`;
  // let values = [
  //   req.body.event_name,
  //   req.body.image_url
  // ];
  // db.query(sql, [values], function(err, data, fields) {
  //   if (err) throw err;
  //   res.json({
  //     status: 200,
  //     message: "New user added successfully"
  //   })
  // })
});

module.exports = router;
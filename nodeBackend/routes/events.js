const express = require('express'),
  router = express.Router();

// get event lists
router.get('/list', function(req, res) {
  let sql = `SELECT * FROM events`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Event lists retrieved successfully"
    })
  })
});

//get event by id
router.get('/:id', function(req, res) {
  let id = req.params.id;
  let sql = `SELECT * FROM events  where event_id = ${id}`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Event retrieved successfully"
    })
  })
});

// create new event
router.post('/new', function(req, res) {
  let sql = `INSERT INTO events(event_name, image_url) VALUES (?)`;
  let values = [
    req.body.event_name,
    req.body.image_url
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New user added successfully"
    })
  })
});

module.exports = router;
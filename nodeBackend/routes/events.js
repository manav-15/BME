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
const User = db.users;

const checkUserLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
}

checkUserAdmin = async (req,res,next) => {
  if(!req.user){
    res.status(401).json({
      authenticated: false,
      message: "User has not been authenticated"
      
    });
    console.log('User has not been authenticated');

  } else if(!req.user.isAdmin){
    res.status(401).json({
      authenticated: true,
      message: "User is not admin"
    })
    console.log('User is not admin')

  }else{

    //check again in DB whether the user is an admin
    const isAdmin = await User.findByPk(req.user.id, {
      attributes : ['isAdmin']
    });
    if(!isAdmin.dataValues.isAdmin){
      res.status(401).json({
        authenticated: true,
        message: "User is not admin/FE false data"
      })
      console.log("User is not admin/FE false data")
    }else{
      console.log("Admin user")
      next();
    }
  }


}

router.get('/created',checkUserAdmin,  (req,res) => {
  // console.log(req)
  // console.log("here")
  const email = req.user.email;
  
  Event.findAll({
    where: {
      userEmail : email
    }
  })
  .then(events => {
    res.json({
      status: 200,
      events,
      message: "Created events retrieved successfully"
    })
    console.log("Created events retrieved successfully")
  })
  .catch(e => {
    console.log(e.original.sqlMessage);
    res.json({
      status: 500,
      error: e.original.sqlMessage
    })
  })


})

// // get event lists
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
router.post('/new', checkUserAdmin, async function(req, res) {
  //console.log(req)
  const startTime = new Date(req.body.startDate + ' ' + req.body.startTime);
  const endTime = new Date(req.body.endDate + ' ' + req.body.endTime);

  // res.json({
  //   status:200
  // })
  Event.create({
    name : req.body.eventName,
    organizer: req.body.eventOrganizer,
    startTime: startTime,
    endTime: endTime,
    userEmail: req.user.email,
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
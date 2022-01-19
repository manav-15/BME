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


//BOOKED EVENTS
//book event
router.post('/book', checkUserLoggedIn, async(req,res) => {
  const userId = req.body.userId;
  const eventId = req.body.eventId;

  if(req.user.id != userId){
    res.status(401).json({
      message: "Unauthorized"
    })
  }

  User.findByPk(userId)
  .then(user => {
    user.addEvent(eventId)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(e => {
      console.log(e)
      res.sendStatus(500);
    })
  })
  .catch(e => {
    console.log(e);
    res.sendStatus(500);
  })

})

//remove booked event
router.put('/book', checkUserLoggedIn, async(req,res) => {
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  

  if(req.user.id != userId){
    res.status(401).json({
      message: "Unauthorized"
    })
  }

  User.findByPk(userId)
  .then(user => {
    user.removeEvent(eventId)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(e => {
      console.log(e)
      res.sendStatus(500);
    })
  })
  .catch(e => {
    console.log(e);
    res.sendStatus(500);
  })


})

//get booked events
router.get('/book', checkUserLoggedIn, async(req,res) => {
  const userId = req.user.id;

  // if(req.user.id != userId){
  //   res.status(401).json({
  //     message: "Unauthorized"
  //   })
  // }

  User.findByPk(userId)
  .then(user => {
    user.getEvents()
    .then(events => {
      res.status(200).json({
        events,
        message: "Booked events retrieved successfully"
      })
    })
    .catch(e => {
      console.log(e);
      res.sendStatus(500);
    })
  })
  .catch(e => {
    console.log(e);
    res.sendStatus(500);
  })


})

//check if user has booked a particular event
router.get('/book/:eventId/user/:userId', async(req,res) => {

  const userId = Number(req.params.userId);
  const eventId = Number(req.params.eventId);
  let isBooked = false;
  

  User.findByPk(userId)
  .then(user => {
    user.hasEvent(eventId)
    .then(event => {
      //console.log(event)
      if(event) isBooked = true;
      res.status(200).json({
        isBooked
      })

    })
    .catch(e => {
      console.log(e);
      res.sendStatus(500);
    })
  })
  .catch(e => {
    console.log(e);
    res.sendStatus(500);
  })



})


// router.get('/', async(req,res) => {
//   const user = await User.findByPk(1);

  
//   user.addEvent(1)
//   .then(r => {
//     console.log(r)
//     user.getEvents().then(e => console.log(e)).catch(e => console.log(e))
//   })
//   .catch(e => console.log(e))
// })



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
  const id = req.params.id;
  
  Event.findByPk(id)
  .then(event => {
    res.json({
      status: 200, 
      event,
      message: "Event retrieved successfully"
    })
  })
  .catch(e => {
    console.log(e);
    res.status(500).json({
      error: e.original.sqlMessage
    })
  })

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
    console.log(e);
    res.status(500).json({
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
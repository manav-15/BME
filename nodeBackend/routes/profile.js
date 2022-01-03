const express = require('express'),
router = express.Router();

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
    req.user ? next(): res.sendStatus(401);
  }
  
  //Protected Route.
router.get('/', checkUserLoggedIn, (req, res) => {
    res.send(`<h1>${req.user.name}'s Profile Page</h1>`)
    // console.log(req)
  });

module.exports = router;
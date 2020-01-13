// require('../routes/index');
// require('../routes/users');

// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index2', { title: 'Job Platform' });
// });

// router.get('/employees/showjobSeeker', function(req, res, next) {
//   res.render('/showjobSeeker', { title: 'Job Platform' });
// });



// module.exports = router;

require('../routes/index2');
require('../routes/users2');

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/index2', ensureAuthenticated, (req, res) =>
  res.render('index2', {
    user: req.user
  })
);

module.exports = router;

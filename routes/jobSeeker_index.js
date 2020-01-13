require('../routes/index2');
require('../routes/users2');
require('../routes/users');
require('../routes/index');

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// new
//var currentJobs_controller = require('../controllers/jobsController');
var Employee_controller = require('../controllers/EmployeeController');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// viewJobs
router.get('/viewJobs', ensureAuthenticated, (req, res) =>
  res.render('viewJobs', {
    jobSeeker: req.jobSeeker
  })
);


module.exports = router;

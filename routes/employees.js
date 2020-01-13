require('../routes/index');
require('../routes/users');

var express = require('express');
var router = express.Router();
var employee = require("../controllers/EmployeeController.js");

var mongoose = require("mongoose");
var Employee = require("../models/Employee");

var employeeController = {};


const app = express();
// Get all employees
router.get('/index2', function(req, res) {
  employee.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
  employee.show(req, res);
});

// Show employee by id new
employeeController.show = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/showSeeker", {employee: employee});
    }
  });
};

// Create employee
router.get('/create', function(req, res) {
  employee.create(req, res);
});

// Save employee
router.post('/save', function(req, res) {
  employee.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
  employee.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  employee.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  employee.delete(req, res);
});

module.exports = router;

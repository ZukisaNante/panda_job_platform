require('../routes/index');
require('../routes/users');


var mongoose = require("mongoose");
var Employee = require("../models/Employee");

var employeeController = {};

// Show list of employees
employeeController.list = function(req, res) {
  Employee.find({}).exec(function (err, employees) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/index2", {employees: employees});
    }
  });
};

// Show employee by id
employeeController.show = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    // if (req.user.isAdmin === true) {
      res.render("../views/employees/show", {employee: employee});
    // }
    // if (req.user.isAdmin === false){
    //    res.render("../views/employees/showSeeker", {employee: employee});
    // }
  });
};
//Show employee by id new
// employeeController.show = function(req, res) {
//   Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
//     if (err) {
//       console.log("Error:", err);
//     }
//     else {
//       res.render("../views/employees/showSeeker", {employee: employee});
//     }
//   });
// };

// Create new employee
employeeController.create = function(req, res) {
  res.render("../views/employees/create");
};

// Save new employee
employeeController.save = function(req, res) {
  var employee = new Employee(req.body);

  employee.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/employees/create");
    } else {
      console.log("Successfully created an employee.");
      res.redirect("/employees/show/"+employee._id);
    }
  });
};

// Edit an employee
employeeController.edit = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/edit", {employee: employee});
    }
  });
};

// Update an employee
employeeController.update = function(req, res) {
  Employee.findByIdAndUpdate(req.params.id, { $set: { jobTitle: req.body.jobTitle, jobDescription: req.body.jobDescription, jobSkills: req.body.jobSkills, 
                   jobQualification: req.body.jobQualification, jobCandidateProfile: req.body.jobCandidateProfile,  jobOffer: req.body.jobOffer, 
                    jobAddress: req.body.jobAddress,   jobCity: req.body.jobCity,  jobSalary: req.body.jobSalary }}, { new: true }, function (err, employee) {
    if (err) {
      console.log(err);
      res.render("../views/employees/edit", {employee: req.body});
    }
    res.redirect("/employees/show/"+employee._id);
  });
};

// Delete an employee
employeeController.delete = function(req, res) {
  Employee.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Employee deleted!");
      res.redirect("/employees/index2");
    }
  });
};

module.exports = employeeController;

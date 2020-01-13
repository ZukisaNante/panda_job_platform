require('../routes/index');
require('../routes/users');

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EmployeeSchema = new mongoose.Schema({
  jobTitle:{
      type: String,
      required: true
  },
  jobDescription:{
      type: String,
    required: true
  },
  jobSkills: {
      type: String,
      required: true
  },
  jobQualification: {
      type: String,
      required: true
  },
  jobCandidateProfile: {
      type: String,
      required: true
  },
  jobOffer:{
      type: String,
      required: true
},
 jobAddress: {
     type: String,
     required: true
     },
  jobSalary: {
      type: Number,
      required: true
      },
  updated_at: { type: Date, default: Date.now },
  jobCity: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);

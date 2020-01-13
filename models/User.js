require('../routes/employees');
require('../routes/users');

const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose"); //new

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  //new
isAdmin: {
  type: Boolean,
  dafault: false
}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
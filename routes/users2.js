require('../routes/index');
require('../routes/users');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/index2', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

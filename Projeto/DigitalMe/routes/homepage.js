var express = require('express');
var router = express.Router();
var home = require('../models/schema')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('homepage')
});

module.exports = router;

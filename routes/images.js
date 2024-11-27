var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: path.join(__dirname, '..', 'uploads')});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', upload.single('new-image'), function(req, res, next) {
  console.log(req.file);
  res.send();
});

module.exports = router;
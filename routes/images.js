var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: path.join(__dirname, '..', 'uploads')});
var {S3Client, PutObjectCommand, ListObjectsV2Command} = require("@aws-sdk/client-s3");
const s3Client = new S3Client({region: 'ap-northeast-2'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  s3Client.send(
    new ListObjectsV2Command({
      Bucket: "test-bucket-20241127-1",
      MaxKeys: 50,
    })).then((data) => {
      res.send(data.Contents);
    }).catch((error) => {
      console.log(error);
    });
});

router.post('/', upload.single('new-image'), function(req, res, next) {
  console.log(req.file);
  fs.readFile(req.file.path, function(err, data) {
    s3Client.send(
      new PutObjectCommand({
        Bucket: "test-bucket-20241127-1",
        Key: req.file.filename,
        Body: data,
        ContentType: req.file.mimetype,
      })
    ).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error(error);
    });
  });
});

module.exports = router;
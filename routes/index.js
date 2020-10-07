var express = require('express');
var router = express.Router();
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');





/* GET home page. */
router.get('/', function(req, res, next) {
  var secret = speakeasy.generateSecret({length: 20});
  //console.log(secret)

  QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
  
    res.render('index',{secret: secret.base32, qr: image_data});
  });
  
});

router.get('/home', function(req, res, next) {
  res.render('home');
});


module.exports = router;

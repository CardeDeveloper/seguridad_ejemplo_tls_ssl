var express = require('express');
var router = express.Router();
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');
const fs = require('fs');
const crypto = require('crypto');




const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const algorithm = 'aes-256-ctr';


const encrypt = (buffer) => {
  // Create an initialization vector
  const iv = crypto.randomBytes(16);
  console.log(iv)
  // Create a new cipher using the algorithm, key, and iv
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  // Create the new (encrypted) buffer
  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
  return result;
};

const decrypt = (encrypted) => {
  // Get the iv: the first 16 bytes
  const iv = encrypted.slice(0, 16);
  console.log(iv)
  // Get the rest
  encrypted = encrypted.slice(16);
  // Create a decipher
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  // Actually decrypt it
  const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return result;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var secret = speakeasy.generateSecret({length: 20});
  //console.log(secret)

  QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
  
    res.render('index',{secret: secret.base32, qr: image_data});
  });
  
});

router.get('/home', function(req, res, next) {
  let files = [];
  fs.readdirSync(`public/uploaded-files`).forEach(file => {
    files.push(file)
  });
  console.log(files)
  
  res.render('home',{files:files});

});

router.post('/decrypt', async (req, res) =>{
  const encrypted_file = fs.readFileSync(`public/uploaded-files/${'file.out.txt'}`)
  decrypted_file = decrypt(encrypted_file);
  console.log('Decrypted file: ', decrypted_file.toString('utf-8'));
  res.redirect('/home');
})

router.post('/encrypt', function (req, res,next) {
  const file = fs.readFileSync(`public/uploaded-files/${'documento.txt'}`)
  encrypted_file = encrypt(file);
  console.log('encrypted file: ', encrypted_file.toString('utf-8'));
  fs.writeFileSync(`public/uploaded-files/${'file.out.txt'}`, encrypted_file, function (err,data) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/home');
})

module.exports = router;

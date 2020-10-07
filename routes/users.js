var express = require('express');
var router = express.Router();
var userModel = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {

  try{
  userModel.create({
     name: req.body.name+" "+ req.body.lastname, 
     email: req.body.email, 
     password: req.body.password,
     token_2FA:req.body.token,
     
   }, (err, result)=>{
    console.log("llego")
     if(err){
       res.status(400).json({status: "error", message: err});
     }
      // res.json({status: "success", message: "Usuario añadido satisfactoriamente!!", data: result});  
       res.redirect('/')  
  })
 }catch(error){
   res.status(500).json({status: "error", error: error});
 }

});

module.exports = router;

var express = require('express');
var router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var speakeasy = require('speakeasy');


router.post('/', function(req,res,next){
    if(!req.body.email || !req.body.password){
        res.status(400).json({status: "error", message: "you should send email and password", data: null});
        next(err);
    }
    userModel.findOne({email:req.body.email}, function(err, userInfo){
        if(err){
            res.status(503).json({status: "error", message: "error in db"});
            next(err);
        }else{
            if(!userInfo){
                
                res.status(401).json({status: "error", message: "Invalid email/password", data: null});
                next();
                return
            }
            
            if(bcrypt.compareSync(req.body.password, userInfo.password)){
                const token = jwt.sign({id: userInfo._id, type: userInfo.type}, req.app.get('secretKey'), {expiresIn: '10h'});
                //res.json({status: "succes", message: "user found!!", data: {user: userInfo, token:token}});
                var verified = speakeasy.totp.verify({
                    secret: userInfo.token_2FA,
                    encoding: 'base32',
                    token: req.body.token
                  });

                  if(verified){
                    res.redirect('/home')
                  }else{
                    res.status(401).json({status: "error", message: "Invalid 2-factor", data: null});
                    next();
                  }
                
                
            }else{
                res.status(401).json({status: "error", message: "Invalid email/password", data: null});
                next();
            }
        }
    });
});

module.exports = router;
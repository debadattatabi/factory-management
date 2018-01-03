var express = require('express');

var User = require('../models/UserModel');
var Response = require('../utils/response');
var api = express.Router();

var config = require('config');
var jwt = require('jsonwebtoken');

api.post('/auth', function(req, res){
  User.findOne({
    email: req.body.email,
  }, function(err, user){
    console.log('req.body')
    if(err)
      throw err;

    if(!user){
      res.json({
        success: false,
        message: 'Authentication failed. User not found'
      })
    }else if(user){
      if(user.password !== req.body.password){
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password'
        })
      }else{
        log.info(user.email);
        if(user.status ==='approval-pending'){
          res.json({
            success: false,
            message: 'your account is on approval pending'
          })
        }else {
          var token = jwt.sign({userId:user._id,role:user.role}, req.app.get('superSecret'), {
            expiresIn: 60*60
          });
          res.json({
            success: true,
            message: 'token!',
            token: token
          })
        }
      }
    }
  })
})

api.post('/user', function(req, res){
  req.body.created_at = new Date();
  var user = new User(req.body);
  User.find({email:user.email},function(usr){
    if(usr && usr.length>0){
      res.send(500,{message:'user already exists'});
    }else {
      console.log(user.role.indexOf('ADMIN'));
      if(user.role.indexOf('ADMIN')>-1){
        user.status = 'active'
      }
      if(checkEmail(user.email)){
        if (user.email.indexOf('in.ibm.com')>-1){
          user.subRole="internal";
        }else {
          user.subRole="external";
        }
        user.save(function(err, user){
            if(!err){
              req.body.id = user.id;
              var resData = Response.data(req.body);
              res.send(resData);
            }else{
              var resError = Response.error({
                code: "500",
                message: "Internal Server Error"
              })
              log.error(err);
              res.status(500).send(err);
            }
        });
      }else {
        console.log('checkEmail failed');
        res.send(500,{message:'please enter ibm email'});
      }
    }
  })
});

var checkEmail = function(email){
  if(email && email != null && email !=''){
  var i = email.indexOf('@')
    if(i >= 0){
      var sign = email.substring(i,email.length);
      if(sign === '@in.ibm.com'){
        return true;
      }else {
        return false;
      }
    }else {
      return false;
    }
  }else {
    return false;
  }
}

module.exports = api;

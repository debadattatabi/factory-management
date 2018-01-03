var express = require('express');

var User = require('../models/UserModel')
var Response = require('../utils/response')
var api = express.Router();


api.get('/users', function(req, res) {
  var token = req.decoded;
  if(token.role.indexOf('ADMIN')>-1){
    var filter ={};
    if(req.query.status){
     filter.status = req.query.status;
    }
    if(req.query.role){
      filter.role = req.query.role;
    }
    if (req.query.subRole) {
      filter.subRole = req.query.subRole;
    }
  User.find(filter, {__v: 0}, function(err, records) {
    if(!err){
      var resData = Response.data(records);
      res.send(resData);
    }else{
      // Handle Error
      log.error(err);
    }
  });
  }else {
    User.findById(token.userId, function(err, doc){
      if(!err){
        var resData = Response.data(doc);
        res.send(resData);
      }else{
        // Handle Error
        log.error(err);
      }
    });
  }
});

// Get details by id
api.get('/user/:id', function(req, res){
  var token = req.decoded;
  if(token.role.indexOf('ADMIN')>-1||  token.role.indexOf('MANAGER')>-1 || req.params.id === token.userId){
    User.findById(req.params.id, function(err, doc){
      if(!err){
        var resData = Response.data(doc);
        res.send(resData);
      }else{
        log.error(err);
      }
    });
  }else {
    res.send(401,{message:'Unauthorized access'});
  }
});

// Update by id
api.put('/user/:id', function(req, res){
  req.body.updated_at = new Date();
  var token = req.decoded;
  if(token.role.indexOf('ADMIN')>-1){
    User.findOneAndUpdate({"_id":req.params.id}, {$set: Object.assign({}, req.body)}, {upset: true}, function(err, doc){
      if(!err){
        var resData = Response.data(doc._id);
        res.send(resData);
      }else{
        log.error(err);
      }
    });
  }else {
    res.send(401,{message:'Unauthorized access'});
  }

});

api.get('/users/:key', function(req, res) {
  User.find({apiKey:req.params.key}, {__v: 0}, function(err, records) {
    if(!err){
      if (records && records.length > 0) {
        res.send(200, {message:"User Found"});
      }else {
        res.send(200, {message:"No User Found"});
      }
    }else{
      // Handle Error
      log.error(err);
    }
  });
});

module.exports = api;

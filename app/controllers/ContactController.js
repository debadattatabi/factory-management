var express = require('express');

var Contact = require('../models/ContactModel');
var Response = require('../utils/response');
var api = express.Router();

// Create
api.post('/contact', function(req, res) {
  req.body.created_at = new Date();
  req.body.updated_at = null;
  var contact = new Contact(req.body);
  contact.save(function(err, contact){
    if(!err){
      req.body.id = contact.id;
      var resData = Response.data(req.body);
      res.send(resData);
    }else{
      // Handle Error
      var resError = Response.error({
        code: "500",
        message: "Internal Server Error"
      })
      log.error(err);
      res.status(500).send(resError);
    }
  });
});

// Get all
api.get('/contacts', function(req, res) {
  Contact.find({}, {__v: 0}, function(err, records) {
    if(!err){
      var resData = Response.data(records);
      res.send(resData);
    }else{
      // Handle Error
      log.error(err);
    }
  });
});

// Get details by id
api.get('/contact/:id', function(req, res){
  Contact.findById(req.params.id, function(err, doc){
    if(!err){
      var resData = Response.data(doc);
      res.send(resData);
    }else{
      // Handle Error
      log.error(err);
    }
  });
})

// Update by id
api.put('/contact/:id', function(req, res){
  req.body.updated_at = new Date();
  Contact.findOneAndUpdate({"_id":req.params.id}, {$set: Object.assign({}, req.body)}, {upset: true}, function(err, doc){
    if(!err){
      var resData = Response.data(doc._id);
      res.send(resData);
    }else{
      // Handle Error
      log.error(err);
    }
  })
});

// Delete by id
api.delete('/contact/:id', function(req, res){
  Contact.deleteOne({"_id":req.params.id}, function(err, doc){
    if(!err){
      res.status(200).send('');
    }else{
      // Handle Error
      var resError = Response.error({
        code: "500",
        message: "Internal Server Error"
      })
      log.error(err);
      res.status(500).send(resError);
    }
  })
})

module.exports = api;

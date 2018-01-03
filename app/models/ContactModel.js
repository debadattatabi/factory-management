var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});

var Model = mongoose.model('contact', schema);

module.exports = Model;
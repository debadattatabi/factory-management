var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  role: [{type: String, enum: ['ADMIN','MANAGER','LEAD','DEVELOPER'], required: true}],
  phoneNo: Number,
  startDate:Date,
  endDate: Date,
  status:{type: String, enum:['active','suspended','approval-pending'] ,default: 'approval-pending'},
  subRole: {type: String, enum: ['internal','external']},
  created_at: Date,
  updated_at: Date,
  apiKey:{ type: String, required: true }
});

var Model = mongoose.model('user', schema);

module.exports = Model;

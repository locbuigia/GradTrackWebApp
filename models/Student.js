const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String
  },
  company: {
    type: String,
    require: true
  },
  position: {
    type: String,
    require: true
  },
  positionDescription: {
    type: String,
    require: true
  },
  skillUsed: {
    type: String,
    require: true
  },
  salary: {
    type: Number
  },
  employmentType: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('student', StudentSchema);

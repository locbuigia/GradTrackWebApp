const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  major: {
    type: String
  },
  phone: {
    type: String
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  positionDesc: {
    type: String,
    required: true
  },
  skillUsed: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    default: 0
  },
  employmentType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('student', StudentSchema);

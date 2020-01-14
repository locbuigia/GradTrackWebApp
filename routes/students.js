const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

const User = require('../models/User');
const Student = require('../models/Student');

// @route   GET api/students
// @desc    Get all users students
// @access  Private
router.get('/', auth, (req, res) => {
  res.send('Get all students');
});

// @route   POST api/students
// @desc    Add new student
// @access  Private
router.post('/', async (req, res) => {
  res.send('Add new student');
});

// @route   PUT api/students/:id
// @desc    Update student
// @access  Private
router.put('/:id', auth, async (req, res) => {
  res.send('Update student with id');
});

// @route   DELETE api/students/:id
// @desc    Delete student
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  res.send('Delete Student with id');
});

module.exports = router;

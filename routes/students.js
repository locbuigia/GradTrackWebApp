const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

const User = require('../models/User');
const Student = require('../models/Student');

// @route   GET api/students
// @desc    Get all users students
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find().sort({ date: -1 });

    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/students
// @desc    Add new student
// @access  Private
router.post('/', auth, async (req, res) => {
  const {
    name,
    email,
    studentID,
    phone,
    company,
    position,
    positionDesc,
    skillUsed,
    salary,
    employmentType
  } = req.body;

  try {
    let student = await Student.findOne({ studentID });
    if (student) {
      res.status(400).json({ msg: 'Student already exists in our database' });
    } else {
      const newStudent = new Student({
        name,
        email,
        studentID,
        phone,
        company,
        position,
        positionDesc,
        skillUsed,
        salary,
        employmentType
      });

      student = await newStudent.save();

      res.json(student);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/students/:id
// @desc    Update student
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    position,
    positionDesc,
    skillUsed,
    salary,
    employmentType
  } = req.body;

  const studentFields = {};

  if (name) studentFields.name = name;
  if (email) studentFields.email = email;
  if (phone) studentFields.phone = phone;
  if (company) studentFields.company = company;
  if (position) studentFields.position = position;
  if (positionDesc) studentFields.positionDesc = positionDesc;
  if (skillUsed) studentFields.skillUsed = skillUsed;
  if (salary) studentFields.salary = salary;
  if (employmentType) studentFields.employmentType = employmentType;

  try {
    let student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ msg: 'Student Not Found' });

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/students/:id
// @desc    Delete student
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ msg: 'Student Not Found' });

    await Student.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Student Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

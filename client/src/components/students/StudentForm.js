import React, { useState, useEffect } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import {
  addStudent,
  updateStudent,
  clearCurrent,
  clearStudentError
} from '../../actions/studentActions';

const StudentForm = props => {
  const {
    student: { error, current },
    addStudent,
    updateStudent,
    clearCurrent,
    clearStudentError,
    loadUser,
    setAlert
  } = props;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (current !== null) {
      setStudent(current);
    }

    if (error) {
      setAlert(error, 'danger');
      clearStudentError();
    }

    // eslint-disable-next-line
  }, [props, current]);

  const [student, setStudent] = useState({
    name: '',
    email: '',
    studentID: '',
    major: '',
    phone: '',
    company: '',
    position: '',
    positionDesc: '',
    skillUsed: '',
    salary: '',
    employmentType: 'Full-time Job'
  });

  const {
    name,
    email,
    studentID,
    major,
    phone,
    company,
    position,
    positionDesc,
    skillUsed,
    salary,
    employmentType
  } = student;

  const onChange = e => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addStudent(student);
    } else {
      updateStudent(student);
      clearCurrent();
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup row>
        <Label for='name' sm={2}>
          Name*
        </Label>
        <Col sm={10}>
          <Input
            type='text'
            name='name'
            placeholder='Student Name'
            onChange={onChange}
            value={name}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='email' sm={2}>
          Email*
        </Label>
        <Col sm={10}>
          <Input
            type='email'
            name='email'
            placeholder='Student Email'
            onChange={onChange}
            value={email}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='studentID' sm={2}>
          Student ID*
        </Label>
        <Col sm={10}>
          <Input
            type='text'
            name='studentID'
            placeholder='Student ID'
            onChange={onChange}
            value={studentID}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='major' sm={2}>
          Major*
        </Label>
        <Col sm={10}>
          <Input
            type='text'
            name='major'
            placeholder='Major'
            onChange={onChange}
            value={major}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='phone' sm={2}>
          Phone
        </Label>
        <Col sm={10}>
          <Input
            type='text'
            name='phone'
            placeholder='Phone'
            value={phone}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='company' sm={2}>
          Company*
        </Label>
        <Col sm={10}>
          <Input
            type='text'
            name='company'
            placeholder='Company'
            onChange={onChange}
            value={company}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='position' sm={2}>
          Position*
        </Label>
        <Col sm={10}>
          <Input
            type='text'
            name='position'
            placeholder='Position'
            onChange={onChange}
            value={position}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='positionDesc' sm={2}>
          Position Description*
        </Label>
        <Col sm={10}>
          <Input
            type='textarea'
            name='positionDesc'
            placeholder='Position Description'
            onChange={onChange}
            value={positionDesc}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='skillUsed' sm={2}>
          Skill Used*
        </Label>
        <Col sm={10}>
          <Input
            type='textarea'
            name='skillUsed'
            placeholder='Skill Used'
            onChange={onChange}
            value={skillUsed}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='salary' sm={2}>
          Annual Salary
        </Label>
        <Col sm={10}>
          <Input
            type='number'
            name='salary'
            placeholder='Annual Salary'
            value={salary || ''}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='employmentType' sm={2}>
          Employment Type*
        </Label>
        <Col sm={10}>
          <Input
            type='select'
            name='employmentType'
            onChange={onChange}
            value={current || student ? employmentType : 'Full-time Job'}
          >
            <option value={'Full-time Job'}>Full-time Job</option>
            <option value={'Part-time Job'}>Part-time Job</option>
            <option value={'Internship'}>Internship</option>
          </Input>
        </Col>
      </FormGroup>
      <Button style={{ float: 'right', margin: 'auto' }}>
        {current ? 'Save' : 'Submit'}
      </Button>
    </Form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  student: state.student
});

StudentForm.propTypes = {
  setAlert: PropTypes.func,
  loadUser: PropTypes.func,
  addStudent: PropTypes.func,
  updateStudent: PropTypes.func,
  clearCurrent: PropTypes.func,
  clearStudentError: PropTypes.func,
  student: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  setAlert,
  loadUser,
  addStudent,
  updateStudent,
  clearCurrent,
  clearStudentError
})(StudentForm);

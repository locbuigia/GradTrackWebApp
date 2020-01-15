import React, { useReducer } from 'react';
import uuid from 'uuid';
import StudentContext from './studentContext';
import studentReducer from './studentReducer';
import {
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  FILTER_STUDENTS,
  CLEAR_FILTER
} from '../types';

const StudentState = props => {
  const initialState = {
    students: [
      {
        id: 1,
        name: 'Student 1',
        email: 'student1@gmail.com',
        studentID: '123456',
        major: 'Computer Science',
        phone: '123-456-7899',
        company: 'Boeing',
        position: 'Software Engineer',
        positionDesc: 'Add new features, fix bugs',
        skillUsed: 'Java, Javascript',
        salary: 80000,
        employmentType: 'Full-time Job'
      },
      {
        id: 2,
        name: 'Student 2',
        email: 'student2@gmail.com',
        studentID: '123457',
        major: 'Computer Engineering',
        phone: '111-222-3333',
        company: 'Boeing',
        position: 'Software Engineer',
        positionDesc: 'Add new features, fix bugs',
        skillUsed: 'Java, Javascript',
        salary: 80000,
        employmentType: 'Full-time Job'
      },
      {
        id: 3,
        name: 'Student 3',
        email: 'student3@gmail.com',
        studentID: '123458',
        major: 'Computer Science',
        phone: '111-456-9879',
        company: 'Boeing',
        position: 'Software Engineer',
        positionDesc: 'Add new features, fix bugs',
        skillUsed: 'Java, Javascript',
        salary: 80000,
        employmentType: 'Full-time Job'
      }
    ]
  };

  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Add Student

  // Delete Student

  // Set Current Student

  // Clear Current Student

  // Update Student

  // Filter Students

  // Clear Filter

  return (
    <StudentContext.Provider
      value={{
        students: state.students
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;

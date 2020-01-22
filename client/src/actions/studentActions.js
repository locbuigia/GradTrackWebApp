import axios from 'axios';
import {
  GET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  FILTER_STUDENTS,
  CLEAR_FILTER,
  STUDENT_ERROR,
  CLEAR_STUDENT_ERROR,
  CLEAR_STUDENTS
} from './types';

// Get Students
export const getStudents = () => async dispatch => {
  try {
    const res = await axios.get('/api/students');
    dispatch({ type: GET_STUDENTS, payload: res.data });
  } catch (err) {
    dispatch({ type: STUDENT_ERROR, payload: err.response.data.msg });
  }
};

// Add Student
export const addStudent = student => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/students', student, config);
    dispatch({ type: ADD_STUDENT, payload: res.data });
    window.location.href = '/';
  } catch (err) {
    if (err) {
      dispatch({ type: STUDENT_ERROR, payload: err.response.data.msg });
    }
  }
};

// Clear students
export const clearStudents = () => dispatch => {
  dispatch({ type: CLEAR_STUDENTS });
};

// Update Student
export const updateStudent = student => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      `/api/students/${student._id}`,
      student,
      config
    );
    dispatch({ type: UPDATE_STUDENT, payload: res.data });
    window.location.href = '/';
  } catch (err) {
    dispatch({ type: STUDENT_ERROR, payload: err.response.data.msg });
  }
};

// Delete Student
export const deleteStudent = id => async dispatch => {
  try {
    await axios.delete(`/api/students/${id}`);
    dispatch({ type: DELETE_STUDENT, payload: id });
  } catch (err) {
    dispatch({ type: STUDENT_ERROR, payload: err.response.data.msg });
  }
};

// Set Current Student
export const setCurrent = student => dispatch => {
  dispatch({ type: SET_CURRENT, payload: student });
};

// Clear Current Student
export const clearCurrent = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT });
};

// Filter Students
export const filterStudents = text => dispatch => {
  dispatch({ type: FILTER_STUDENTS, payload: text });
};

// Clear Filter
export const clearFilter = () => dispatch => {
  dispatch({ type: CLEAR_FILTER });
};

// Clear Student Error
export const clearStudentError = () => dispatch => {
  dispatch({ type: CLEAR_STUDENT_ERROR });
};

import {
  GET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  STUDENT_ERROR,
  FILTER_STUDENTS,
  CLEAR_STUDENTS,
  CLEAR_FILTER,
  CLEAR_STUDENT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case STUDENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students]
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student._id === action.payload._id ? action.payload : student
        )
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          student => student._id !== action.payload
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_STUDENTS:
      return {
        ...state,
        filtered: state.students.filter(student => {
          const {
            name,
            studentID,
            major,
            company,
            position,
            skillUsed
          } = student;
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            name.match(regex) ||
            studentID.match(regex) ||
            major.match(regex) ||
            company.match(regex) ||
            position.match(regex) ||
            skillUsed.match(regex)
          );
        })
      };
    case CLEAR_STUDENTS:
      return {
        ...state,
        students: []
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CLEAR_STUDENT_ERROR:
      return {
        ...state,
        error: null,
        filtered: null,
        current: null
      };
    default:
      return state;
  }
};

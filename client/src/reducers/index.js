import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import studentReducer from './studentReducer';

export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  student: studentReducer
});

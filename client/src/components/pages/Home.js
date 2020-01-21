import React, { Fragment, useEffect, useContext } from 'react';
import StudentList from '../students/StudentList';
import StudentFilter from '../students/StudentFilter';

import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';

const Home = props => {
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);

  useEffect(() => {
    studentContext.setCurrent(null);
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div>
        <div>
          <StudentFilter />
        </div>
        <button
          className='btn btn-success add-btn'
          onClick={() => props.history.push('/form')}
        >
          Add Student
        </button>
      </div>
      <div>
        <StudentList {...props} />
      </div>
    </Fragment>
  );
};

export default Home;

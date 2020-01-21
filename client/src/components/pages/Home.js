import React, { Fragment, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import StudentList from '../students/StudentList';
import StudentFilter from '../students/StudentFilter';
import { loadUser } from '../../actions/authActions';

import StudentContext from '../../context/student/studentContext';

const Home = props => {
  const studentContext = useContext(StudentContext);

  useEffect(() => {
    studentContext.setCurrent(null);
    props.loadUser();
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Home);

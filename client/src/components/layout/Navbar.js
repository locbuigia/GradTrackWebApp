import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearStudents } = studentContext;

  const onLogout = () => {
    logout();
    clearStudents();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <button className='link' onClick={() => (window.location.href = '/')}>
          <i className={icon} /> {title}
        </button>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'GradTrack',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;

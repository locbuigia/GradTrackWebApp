import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';
import { clearStudents } from '../../actions/studentActions';

const Navbar = props => {
  const {
    auth: { isAuthenticated, user },
    title,
    icon,
    logout,
    clearStudents
  } = props;

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
  icon: PropTypes.string,
  logout: PropTypes.func,
  auth: PropTypes.object.isRequired
};

Navbar.defaultProps = {
  title: 'GradTrack',
  icon: 'fas fa-id-card-alt'
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, clearStudents })(Navbar);

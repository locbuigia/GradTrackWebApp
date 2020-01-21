import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

const Login = props => {
  const {
    login,
    clearErrors,
    setAlert,
    auth: { error, isAuthenticated }
  } = props;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');

      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, clearErrors, setAlert })(
  Login
);

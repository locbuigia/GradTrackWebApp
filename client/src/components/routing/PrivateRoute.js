import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
  const {
    auth: { isAuthenticated },
    component: Component,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !localStorage.token ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(PrivateRoute);

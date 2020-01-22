import React from 'react';
import { connect } from 'react-redux';

const Alerts = props => {
  return (
    props.alerts.length > 0 &&
    props.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps, {})(Alerts);

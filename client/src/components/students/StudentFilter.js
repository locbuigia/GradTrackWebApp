import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterStudents, clearFilter } from '../../actions/studentActions';
import PropTypes from 'prop-types';

const StudentFilter = props => {
  const {
    filterStudents,
    clearFilter,
    student: { filtered }
  } = props;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterStudents(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Search Students by SID, Name, Major, Company, Position or Skills Used'
        onChange={onChange}
      />
    </form>
  );
};

const mapStateToProps = state => ({
  student: state.student
});

StudentFilter.propTypes = {
  filterStudents: PropTypes.func,
  clearFilter: PropTypes.func,
  student: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { filterStudents, clearFilter })(
  StudentFilter
);

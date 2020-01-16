import React, { useContext, useRef, useEffect } from 'react';
import StudentContext from '../../context/student/studentContext';

const StudentFilter = () => {
  const studentContext = useContext(StudentContext);
  const { filterStudents, clearFilter, filtered } = studentContext;
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

export default StudentFilter;

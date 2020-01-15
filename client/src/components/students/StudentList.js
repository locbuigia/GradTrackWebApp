import React, { useContext } from 'react';
import ReactDataGrid from 'react-data-grid';
import StudentContext from '../../context/student/studentContext';

const StudentList = () => {
  const studentContext = useContext(StudentContext);

  const { students } = studentContext;

  const defaultColumnProperties = {
    sortable: true,
    width: 150
  };

  const columns = [
    {
      key: 'studentID',
      name: 'Student ID'
    },
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'company',
      name: 'Company'
    },
    {
      key: 'position',
      name: 'Position'
    },
    {
      key: 'salary',
      name: 'Salary'
    },
    {
      key: 'employmentType',
      name: 'Employment Type'
    }
  ].map(c => ({ ...c, ...defaultColumnProperties }));

  return (
    <ReactDataGrid
      columns={columns}
      minHeight={500}
      minWidth={900}
      rowGetter={i => students[i]}
      rowsCount={3}
    />
  );
};

export default StudentList;

import React, { useContext } from 'react';
import { Table } from 'reactstrap';
import StudentContext from '../../context/student/studentContext';

const StudentList = () => {
  const studentContext = useContext(StudentContext);

  const { students } = studentContext;

  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Major</th>
          <th>Company</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Employment Type</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{student.studentID}</td>
            <td>{student.name}</td>
            <td>{student.major}</td>
            <td>{student.company}</td>
            <td>{student.position}</td>
            <td>${student.salary}</td>
            <td>{student.employmentType}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentList;

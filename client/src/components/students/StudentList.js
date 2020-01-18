import React, { useState, useContext, useEffect } from 'react';
import { Table } from 'reactstrap';
import StudentContext from '../../context/student/studentContext';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const StudentList = props => {
  const studentContext = useContext(StudentContext);

  const {
    students,
    filtered,
    deleteStudent,
    setCurrent,
    getStudents
  } = studentContext;

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);

  const [detailModal, setDetailModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [currStudent, setCurrStudent] = useState(null);

  const detailModalToggle = student => {
    setDetailModal(!detailModal);
    student && setCurrStudent(student);
  };

  const deleteConfirmModalToggle = () => {
    setConfirmDeleteModal(!confirmDeleteModal);
  };

  const onDelete = id => {
    deleteStudent(id);
    detailModalToggle();
  };

  const onEdit = student => {
    setCurrent(student);
    detailModalToggle();
    props.history.push('/form');
  };

  const renderConfirmDeleteModal = () => {
    return (
      <Modal
        isOpen={confirmDeleteModal}
        toggle={deleteConfirmModalToggle}
        className='ui-modal-box'
      >
        <ModalHeader toggle={deleteConfirmModalToggle}>
          Confirm Delete
        </ModalHeader>
        <ModalBody>
          <p>Do you want to remove this student?</p>
        </ModalBody>
        <ModalFooter>
          <button
            className='btn btn-danger'
            onClick={() => {
              onDelete(currStudent._id);
              deleteConfirmModalToggle();
            }}
          >
            Delete
          </button>
          <button
            style={{ background: 'lightgrey' }}
            className='btn'
            onClick={deleteConfirmModalToggle}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  const renderModal = () => {
    return (
      currStudent && (
        <Modal
          isOpen={detailModal}
          toggle={detailModalToggle}
          className='ui-modal-box'
        >
          <ModalHeader toggle={detailModalToggle}>Student Detail</ModalHeader>
          <ModalBody>
            <b>Student ID:</b> {currStudent.studentID}
            <br />
            <b>Student Name:</b> {currStudent.name}
            <br />
            <b>Email:</b> {currStudent.email}
            <br />
            <b>Major:</b> {currStudent.major}
            <br />
            <b>Phone:</b> {currStudent.phone}
            <br />
            <b>Company:</b> {currStudent.company}
            <br />
            <b>Position:</b> {currStudent.position}
            <br />
            <b>Position Description:</b> {currStudent.positionDesc}
            <br />
            <b>Skills Used:</b> {currStudent.skillUsed}
            <br />
            <b>Salary:</b>
            {currStudent.salary ? `$${currStudent.salary}` : 'Not Provided'}
            <br />
            <b>Employment Type:</b> {currStudent.employmentType}
            <br />
          </ModalBody>
          <ModalFooter>
            <button
              className='btn btn-primary'
              onClick={() => onEdit(currStudent)}
            >
              Edit
            </button>
            <button
              className='btn btn-danger'
              onClick={() => deleteConfirmModalToggle()}
            >
              Delete
            </button>
            {renderConfirmDeleteModal()}
            <button
              style={{ background: 'lightgrey' }}
              className='btn'
              onClick={detailModalToggle}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      )
    );
  };

  let data = filtered || students;

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
        {data.map((student, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>
              <a href='/#' onClick={() => detailModalToggle(student)}>
                {student.studentID}
                {renderModal()}
              </a>
            </td>
            <td>{student.name}</td>
            <td>{student.major}</td>
            <td>{student.company}</td>
            <td>{student.position}</td>
            <td>{student.salary ? `$${student.salary}` : 'Not Provided'}</td>
            <td>{student.employmentType}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentList;

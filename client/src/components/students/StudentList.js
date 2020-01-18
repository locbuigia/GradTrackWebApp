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

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currStudent, setCurrStudent] = useState(null);

  const toggle = student => {
    setModal(!modal);
    student && setCurrStudent(student);
  };

  const deleteConfirmToggle = () => {
    setDeleteModal(!deleteModal);
  };

  const onDelete = id => {
    deleteStudent(id);
    toggle();
  };

  const onEdit = student => {
    setCurrent(student);
    toggle();
    props.history.push('/form');
  };

  const renderModal = () => {
    return (
      currStudent && (
        <Modal isOpen={modal} toggle={toggle} className='ui-modal-box'>
          <ModalHeader toggle={toggle}>Student Detail</ModalHeader>
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
            <b>Salary:</b>{' '}
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
            </button>{' '}
            <button
              className='btn btn-danger'
              onClick={() => deleteConfirmToggle()}
            >
              Delete
            </button>
            <Modal
              isOpen={deleteModal}
              toggle={deleteConfirmToggle}
              className='ui-modal-box'
            >
              <ModalHeader toggle={deleteConfirmToggle}>
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
                    deleteConfirmToggle();
                  }}
                >
                  Delete
                </button>
                <button
                  style={{ background: 'lightgrey' }}
                  className='btn'
                  onClick={deleteConfirmToggle}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Modal>{' '}
            <button
              style={{ background: 'lightgrey' }}
              className='btn'
              onClick={toggle}
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
              <a href='/#' onClick={() => toggle(student)}>
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

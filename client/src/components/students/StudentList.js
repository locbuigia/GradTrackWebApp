import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import {
  deleteStudent,
  setCurrent,
  getStudents
} from '../../actions/studentActions';
import { dynamicSort } from '../../utils/index';

const StudentList = props => {
  const {
    student: { students, filtered },
    deleteStudent,
    setCurrent,
    getStudents
  } = props;

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);

  const [detailModal, setDetailModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [currStudent, setCurrStudent] = useState(null);
  const [sortValue, setSortValue] = useState('');

  const detailModalToggle = student => {
    setDetailModal(!detailModal);
    student && setCurrStudent(student);
  };

  const deleteConfirmToggle = () => {
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
        toggle={deleteConfirmToggle}
        className='ui-modal-box'
      >
        <ModalHeader toggle={deleteConfirmToggle}>Confirm Delete</ModalHeader>
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
      </Modal>
    );
  };

  const renderDetailModal = () => {
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
              onClick={() => deleteConfirmToggle()}
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

  const sortSalary = property => {
    if (sortValue === '' || sortValue === `${property}`) {
      data = data.sort(dynamicSort(`-${property}`));
      setSortValue(`-${property}`);
    } else {
      data = data.sort(dynamicSort(`${property}`));
      setSortValue(`${property}`);
    }
  };

  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Student ID</th>
          <th>
            <a
              href='/#'
              className='sortable-header'
              onClick={() => sortSalary('name')}
            >
              Student Name
            </a>
          </th>
          <th>Major</th>
          <th>Company</th>
          <th>Position</th>
          <th>
            <a
              href='/#'
              className='sortable-header'
              onClick={() => sortSalary('salary')}
            >
              Salary
            </a>
          </th>
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
                {renderDetailModal()}
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

const mapStateToProps = state => ({
  student: state.student,
  auth: state.auth
});

StudentList.propTypes = {
  deleteStudent: PropTypes.func,
  setCurrent: PropTypes.func,
  getStudents: PropTypes.func,
  student: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  deleteStudent,
  setCurrent,
  getStudents
})(StudentList);

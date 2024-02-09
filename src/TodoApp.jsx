// src/App.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Form, ListGroup, Modal } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Add this line
  const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] = useState(false); // Add this line

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addTask = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newTask.trim() !== '') {
      const newTaskObj = { text: newTask, completed: false, date: new Date().toLocaleString() };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditIndex(null);
    setEditText('');
    setShowModal(false);
  };

  const saveEdit = () => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = editText;
      setTasks(updatedTasks);
      closeEditModal();
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    const updatedCompletedTasks = [...completedTasks];

    updatedTasks[index].completed = !updatedTasks[index].completed;

    if (updatedTasks[index].completed) {
      const completedTask = updatedTasks.splice(index, 1)[0];
      updatedCompletedTasks.push(completedTask);
      setCompletedTasks(updatedCompletedTasks);
    }

    setTasks(updatedTasks);
  };

  const deleteCompletedTask = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  };

  const deleteAll = () => {
    setTasks([]);
  };

  const deleteAllCompleted = () => {
    setCompletedTasks([]);
  };

  const openDeleteConfirmation = (index) => {
    setTaskToDelete(index);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setTaskToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      deleteTask(taskToDelete);
      closeDeleteConfirmation();
    }
  };

  const openDeleteAllConfirmation = () => {
    setShowDeleteAllConfirmation(true);
  };

  const closeDeleteAllConfirmation = () => {
    setShowDeleteAllConfirmation(false);
  };

  const confirmDeleteAll = () => {
    setTasks([]);
    closeDeleteAllConfirmation();
  };

  return (
    <main>
      <style type="text/css">
        {`
          .btn-flat {
            background-color: #F4512C;
            color: white;
          }
          // .btn-danger {
          //   background-color: #F4512C;
          //   color: white;
          // }
        `}
      </style>

      <Navbar className="navbar-fixed">
        <Container>
          <Navbar.Brand>
            <h4>Todo App</h4>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <h4>Nico Cruz</h4>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        className="mt-3 center-container"
        style={{
          backgroundColor: "#F8FFFE",
          padding: '20px',
          borderRadius: '10px',
          width: '100%',
        }}
      >
        {/* <h1>Todo App</h1> */}
        <Form className="d-flex">
        <Form.Group className="mb-3 d-flex" style={{ width:'100%', marginTop: '8px'}}>
          <Form.Control
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask(e)}
            style={{
              height: '50px',
              marginRight: '8px', // Adjust the margin as needed
              backgroundColor: '#f2f2f2',
              
            }}
          />
          <Button variant="flat" onClick={addTask}>
            Add
          </Button>
        </Form.Group>

          {/* <Button variant="primary" onClick={addTask} className="ml-2">
            Add
          </Button> */}
        </Form>

        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-3">Tasks</h3>
          <Button variant="danger" className="mt-3" onClick={openDeleteAllConfirmation}>
          <MdDeleteOutline margin="auto" />
          Delete All
        </Button>
        </div>
          <hr />

          <ListGroup style={{ marginTop: '20px' }}>
  {tasks.map((task, index) => (
    <ListGroup.Item
      key={index}
      className={`d-flex justify-content-between align-items-center ${
        task.completed ? 'text-decoration-line-through' : ''
      }`}
      style={{ 
        backgroundColor: '#f2f2f2', 
        padding: '10px',
        borderRadius: '10px',
        width: '100%', 
        marginBottom: '10px', // Add margin-bottom as needed
      }}
    >
      <div className="d-flex align-items-center">
        <Form.Check
          type="checkbox"
          id={`checkbox-${index}`}
          checked={task.completed}
          onChange={() => toggleTaskCompletion(index)}
          className="mr-2"
          style={{ marginRight: '15px'}}
        />
        <span>{task.text}</span>
      </div>
      <div className="d-flex flex-column align-items-end">
        <span style={{ marginBottom: '5px' }}>{task.date}</span>
        <div>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => openEditModal(index)}
            className="mr-2"
            style={{ marginRight: '15px' }}
          >
            <TbEdit size="20px" />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => openDeleteConfirmation(index)}
          >
            <MdDeleteOutline size="20px" />
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  ))}
</ListGroup>

      

        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-3">Completed Tasks</h3>
          <Button variant="warning" className="mt-3 ms-2" onClick={deleteAllCompleted}>
            Delete Completed
          </Button>
        </div>
        <hr />

        <ListGroup>
          {completedTasks.map((task, index) => (
            <ListGroup.Item
              key={index}
              className="text-decoration-line-through"
              style={{
                backgroundColor: "#f2f2f2",
                padding: '10px',
                borderRadius: '10px',
                width: '100%',
                marginBottom: '10px', // Add margin-bottom as needed
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span>{task.text}</span>
                <Button variant="outline-danger" size="sm" onClick={() => deleteCompletedTask(index)}>
               
                Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>


        {/* Edit Modal */}
        <Modal show={showModal} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={saveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={closeEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

       {/* Delete Confirmation Modal */}
       <Modal show={showDeleteConfirmation} onHide={closeDeleteConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this task?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteTask}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete All Confirmation Modal */}
      <Modal show={showDeleteAllConfirmation} onHide={closeDeleteAllConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete all tasks?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteAllConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAll}>
            Confirm Delete All
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default TodoApp;

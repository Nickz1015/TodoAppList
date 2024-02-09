// src/App.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Form, ListGroup, Modal } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  return (
    <main>
      <style type="text/css">
        {`
          .btn-flat {
            background-color: purple;
            color: white;
          }
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
        <h1>Todo App</h1>
        <Form className="d-flex">
          <Form.Group className="mb-3 flex-grow-1">
            <Form.Control
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask(e)}
            />
          </Form.Group>
          <Button variant="primary" onClick={addTask} className="ml-2">
            Add
          </Button>
        </Form>

        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mt-3">Tasks</h2>
          <Button variant="danger" className="mt-3" onClick={deleteAll}>
            Delete All
          </Button>
        </div>

        <ListGroup>
          {tasks.map((task, index) => (
            <ListGroup.Item
              key={index}
              className={`d-flex justify-content-between align-items-center ${
                task.completed ? 'text-decoration-line-through' : ''
              }`}
            >
              <div className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="mr-2"
                  style={{ marginRight: '15px' }}
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
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteTask(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mt-3">Completed Tasks</h2>
          <Button variant="warning" className="mt-3 ms-2" onClick={deleteAllCompleted}>
            Delete Completed
          </Button>
        </div>

        <ListGroup>
          {completedTasks.map((task, index) => (
            <ListGroup.Item key={index} className="text-decoration-line-through">
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
    </main>
  );
};

export default TodoApp;

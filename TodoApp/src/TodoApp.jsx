// src/App.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Table, Modal } from 'react-bootstrap';
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

  const addTask = () => {
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
          width: '1000px',
        }}
      >
        <h1>Todo App</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={addTask}>
            Add Task
          </Button>
        </Form>
        <h2 className="mt-3">Tasks</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: '10%'}}></th>
              <th style={{ width: '40%'}} >Task Name</th>
              <th style={{ width: '25%' }}>Date Created</th>
              <th style={{ width: '25%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={task.completed ? 'text-decoration-line-through' : ''}>
                <td>
                  <Form.Check
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                </td>
                <td>{task.text}</td>
                <td>{task.date}</td>
                <td>
                  <Button variant="outline-warning" size="sm" onClick={() => openEditModal(index)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteTask(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h2 className="mt-3">Completed Tasks</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task, index) => (
              <tr key={index} className="text-decoration-line-through">
                <td>{task.text}</td>
                <td>{task.date}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteCompletedTask(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="danger" className="mt-3" onClick={deleteAll}>
          Delete All
        </Button>
        <Button variant="warning" className="mt-3 ms-2" onClick={deleteAllCompleted}>
          Delete Completed
        </Button>
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

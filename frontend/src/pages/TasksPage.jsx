// src/pages/TasksPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl, Pagination, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  
  // Pagination and Search state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/tasks?page=${currentPage}&search=${debouncedSearchTerm}`);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch tasks. Please ensure the backend is running and credentials are correct.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setFormData({ title: '', description: '' });
  };

  const handleShowCreateModal = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '' });
    setShowModal(true);
  };

  const handleShowEditModal = (task) => {
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    
    // Frontend Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and Description cannot be empty.');
      return;
    }
    if (formData.title.length > 100) {
      alert('Title must be 100 characters or less.');
      return;
    }
    if (formData.description.length > 500) {
      alert('Description must be 500 characters or less.');
      return;
    }

    try {
      if (editingTask) {
        // Update task
        await api.put(`/tasks/${editingTask._id}`, formData);
      } else {
        // Create task
        await api.post('/tasks', formData);
      }
      fetchTasks(); // Refresh list
      handleCloseModal();
    } catch (err) {
      setError('Failed to save task.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks(); // Refresh list
      } catch (err) {
        setError('Failed to delete task.');
        console.error(err);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Create pagination items
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: '400px' }}>
          <InputGroup.Text>Q</InputGroup.Text>
          <FormControl
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleShowCreateModal}>+ Create Task</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td>{task._id.slice(-6)}</td> {/* Show last 6 chars of ID for brevity */}
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleShowEditModal(task)}>Edit</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(task._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              {items}
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
        </>
      )}

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Edit Task' : 'Create Task'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveTask}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                maxLength="100"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                maxLength="500"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" type="submit">Save Task</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default TasksPage;
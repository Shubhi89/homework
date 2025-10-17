// src/pages/TasksPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl, Pagination, Spinner, Alert, Card } from 'react-bootstrap';
import api from '../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
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
    
    [cite_start]// Frontend Validation from the assessment requirements [cite: 152-153]
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
        await api.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      fetchTasks();
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
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task.');
        console.error(err);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      {/* --- Responsive Control Bar --- */}
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3 mb-4">
        <InputGroup className="w-100" style={{ maxWidth: '400px' }}>
          <FormControl
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleShowCreateModal} className="w-100 w-md-auto">
          + Create Task
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : tasks.length > 0 ? (
        <>
          {/* --- Responsive Table --- */}
          <Table striped bordered hover variant="dark" responsive="sm">
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
                  <td>{task._id.slice(-6)}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                  <td>
                    {/* --- Responsive Action Buttons --- */}
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <Button variant="outline-warning" size="sm" onClick={() => handleShowEditModal(task)}>Edit</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(task._id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <Card body className="text-center bg-dark-tertiary">No tasks found. Try adjusting your search.</Card>
      )}

      {/* The Modal is responsive by default */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Edit Task' : 'Create Task'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveTask}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleFormChange} maxLength="100" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleFormChange} maxLength="500" required />
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
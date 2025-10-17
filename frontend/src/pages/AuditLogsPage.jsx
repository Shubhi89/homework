import React, { useState, useEffect } from 'react';
import { Table, Badge, Spinner, Alert, Card } from 'react-bootstrap';
import api from '../services/api';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/logs');
        setLogs(response.data.logs || response.data); // Handle both paginated and non-paginated responses
      } catch (err) {
        setError('Failed to fetch audit logs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionBadge = (action) => {
    switch (action) {
      case 'Create Task':
        return <Badge bg="success">Create</Badge>;
      case 'Update Task':
        return <Badge bg="warning">Update</Badge>;
      case 'Delete Task':
        return <Badge bg="danger">Delete</Badge>;
      default:
        return <Badge bg="secondary">{action}</Badge>;
    }
  };
  
  const formatContent = (content) => {
    if (!content || typeof content !== 'object' || Object.keys(content).length === 0) {
      return '-';
    }
    return Object.entries(content)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(', ');
  };

  return (
    <>
      <h3 className="mb-4 text-primary fs-3">Audit Logs</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : logs.length > 0 ? (
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Task ID</th>
              <th>Updated Content</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{getActionBadge(log.action)}</td>
                <td>{log.taskId ? log.taskId.slice(-6) : '-'}</td>
                <td>{formatContent(log.updatedContent)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Card body className="text-center bg-dark-tertiary">
          No audit logs found.
        </Card>
      )}
    </>
  );
};

export default AuditLogsPage;
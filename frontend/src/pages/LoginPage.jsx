// src/pages/LoginPage.jsx
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const loginSuccess = login(username, password);

    if (loginSuccess) {
      navigate('/tasks'); // Redirect to the main dashboard
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center" fluid data-bs-theme="dark">
      <Row>
        <Col>
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Task Manager Login</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <div className="d-grid">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
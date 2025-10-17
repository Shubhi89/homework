// src/components/Layout.jsx
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css'; // We'll create this CSS file next

const Layout = () => {
  return (
    <Container fluid className="vh-100 d-flex flex-column p-0" data-bs-theme="dark">
      <header className="bg-dark border-bottom border-secondary-subtle px-4 py-2 d-flex align-items-center">
        <NavLink to = '/' className="mb-0 text-primary bold fs-2 text-decoration-none">✓ Task Manager</NavLink>
      </header>
      <Row className="flex-grow-1 mx-0">
        <Col xs={2} className="bg-dark p-3 border-end border-secondary-subtle">
          <Nav className="flex-column">
            <Nav.Item>
              <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/audit-logs" className="nav-link">Audit Logs</NavLink>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={10} className="p-4 bg-dark-subtle">
          <Outlet /> {/* Child routes will render here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
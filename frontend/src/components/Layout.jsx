// src/components/Layout.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SidebarNav from './SidebarNav'; // Import the new Nav component
import './Layout.css';

const Layout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarClose = () => setShowSidebar(false);
  const handleSidebarShow = () => setShowSidebar(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // This function is passed to the mobile sidebar to close it after navigation
  const handleLinkClick = () => {
    handleSidebarClose();
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0" data-bs-theme="dark">
      <header className="bg-dark border-bottom border-secondary-subtle px-3 py-2 d-flex justify-content-between align-items-center">
        {/* Hamburger Menu - visible only on smaller screens */}
        <Button variant="dark" onClick={handleSidebarShow} className="d-lg-none">
          ☰
        </Button>
        
        <h5 className="mb-0 mx-2">✓ Task Manager</h5>

        {/* Spacer to push logout to the right */}
        <div className="flex-grow-1"></div> 
        
        <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <Row className="flex-grow-1 mx-0">
        {/* Static Sidebar - visible only on large screens */}
        <Col lg={2} className="d-none d-lg-block bg-dark p-3 border-end border-secondary-subtle">
          <SidebarNav />
        </Col>

        {/* Main Content Area */}
        <Col xs={12} lg={10} className="p-4 bg-dark-subtle overflow-auto">
          <Outlet /> {/* Child routes will render here */}
        </Col>
      </Row>

      {/* Offcanvas Sidebar for Mobile/Tablet */}
      <Offcanvas show={showSidebar} onHide={handleSidebarClose} responsive="lg" className="bg-dark text-white">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarNav onLinkClick={handleLinkClick} />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Layout;
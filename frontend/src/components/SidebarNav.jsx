import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const SidebarNav = ({ onLinkClick }) => {
  return (
    <Nav className="flex-column">
      <Nav.Item>
        <NavLink to="/tasks" className="nav-link" onClick={onLinkClick}>
          Tasks
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/audit-logs" className="nav-link" onClick={onLinkClick}>
          Audit Logs
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default SidebarNav;
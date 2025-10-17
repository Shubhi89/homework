// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './pages/TasksPage';
import AuditLogsPage from './pages/AuditLogsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
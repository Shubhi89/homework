# Task Manager Dashboard

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Bootstrap. This project allows users to perform full CRUD operations on tasks and view a detailed audit trail of all changes. The application is secured with basic authentication and features a fully responsive design.

**Live Demo**: **[https://homework-1-ig5l.onrender.com](https://homework-1-ig5l.onrender.com)**

---

## Features

* **Full CRUD Operations**: Create, Read, Update, and Delete tasks through a user-friendly modal interface.
* **Real-time Search & Filtering**: Dynamically filter tasks by title or description with a debounced search input for better performance.
* **Backend Pagination**: Efficiently handles large datasets by paginating tasks on both the frontend and backend.
* **Comprehensive Audit Logs**: A dedicated, paginated view to track every action performed (task creation, updates, deletions) with timestamps and details of the changes.
* **Secure Authentication**: A simple login page and protected routes on the frontend. [cite_start]All backend API endpoints are secured using static Basic Authentication.
* **Input Validation**: Robust validation on both the client and server to ensure data integrity, checking for empty fields and character limits.
* **Fully Responsive Design**: A seamless user experience across desktop, tablet, and mobile devices, featuring a collapsible sidebar and responsive tables.

---

## Tech Stack

* **Frontend**: React, React Bootstrap, React Router, Axios
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)
* **Deployment**: Render (Web Service for Backend + Static Site for Frontend)

---

## Setup and Installation

To run this project locally, you will need two separate terminals: one for the backend server and one for the frontend React app.

### **1. Backend Setup**

```bash
# Clone the repository
git clone [https://github.com/Shubhi89/homework.git](https://github.com/Shubhi89/homework.git)
cd homework/backend

# Install dependencies
npm install

# Create a .env file in the /backend directory and add your variables
# (replace with your actual MongoDB connection string)
PORT=5001
MONGO_URI=<your_mongodb_connection_string>

# Start the server
node server.js
```
---

### **2. Frontend Setup**

```bash

# Navigate to the frontend directory from the root
cd ../frontend

# Install dependencies
npm install
```
---

### **3. API Endpoints**

| Method   | Endpoint     | Description                                           |
| :------- | :----------- | :---------------------------------------------------- |
| `GET`    | `/tasks`     | Fetch a paginated and filterable list of tasks. |
| `POST`   | `/tasks`     | Create a new task.                            |
| `PUT`    | `/tasks/:id` | Update an existing task.                      |
| `DELETE` | `/tasks/:id` | Delete a specific task.                       |
| `GET`    | `/logs`      | Get a paginated list of all audit log entries.    |

---

### **3. Authentication Credentials**

* **Username**: `admin`
* **Password**: `password123`

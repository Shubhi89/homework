Task Manager DashboardA full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Bootstrap. This project allows users to perform CRUD operations on tasks, view an audit trail of all changes, and is protected by basic authentication.Live Demo LinkScreenshotA screenshot of the main tasks dashboard UI. 1FeaturesFull CRUD Functionality: Create, Read, Update, and Delete tasks through a user-friendly modal interface. 2Real-time Search & Filtering: Dynamically filter tasks by title or description. 3333Backend Pagination: Efficiently handles large datasets by paginating tasks on both the frontend and backend (5 per page). 4444Comprehensive Audit Logs: A dedicated view to track every action performed (task creation, updates, deletions) with timestamps and details of what changed. 5555Secure Authentication: All API endpoints are protected using static Basic Authentication. 6Input Validation: Robust validation on both client and server to ensure data integrity and prevent errors. 7777Fully Responsive Design: A seamless user experience across desktop, tablet, and mobile devices. 8Tech StackFrontend: React, React Bootstrap, React Router, AxiosBackend: Node.js, Express.jsDatabase: MongoDB (with Mongoose)Deployment: Render (Web Service + Static Site)Setup and InstallationTo run this project locally, you will need two separate terminals: one for the backend server and one for the frontend React app.1. Backend SetupBash# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/backend

# Install dependencies
npm install

# Create a .env file in the /backend directory and add your variables
# (replace with your actual MongoDB connection string)
PORT=5001
MONGO_URI=<your_mongodb_connection_string>

# Start the server
node server.js
The backend server will be running on http://localhost:5001.2. Frontend SetupBash# Navigate to the frontend directory from the root
cd ../frontend

# Install dependencies
npm install

# Start the React development server
npm run dev
The frontend application will be available at http://localhost:5173 (or another port if 5173 is busy).API EndpointsAll API routes are protected by Basic Authentication and are prefixed with /api.MethodEndpointDescriptionGET/tasksFetch a paginated and filterable list of tasks. 9POST/tasksCreate a new task. 10PUT/tasks/:idUpdate an existing task. 11DELETE/tasks/:idDelete a specific task. 12GET/logsGet all audit log entries. 13AuthenticationAll API requests must include a Basic Authentication header.Username: admin 14Password: password123 15Folder StructureThe project is organized into a monorepo structure to keep the frontend and backend codebases separate but within the same repository.BackendThe backend follows a modular MVC (Model-View-Controller) pattern./backend
├── controllers/  # Contains the business logic
├── models/       # Mongoose schemas for the database
├── routes/       # API route definitions
└── server.js     # Main server entry point
FrontendThe frontend is structured to separate concerns for better maintainability./frontend/src
├── components/   # Reusable UI components (Layout, Modals, etc.)
├── context/      # React context for global state (e.g., Auth)
├── pages/        # Main page components (TasksPage, LoginPage)
└── services/     # API communication logic (axios instance)

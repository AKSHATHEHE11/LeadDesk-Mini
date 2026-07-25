# LeadDesk Mini CRM

A full-stack Lead Management CRM built for small sales teams. The application enables lead capture, lead assignment, tracking, and lifecycle management with secure role-based access.

**Built for Digital Heroes Training Task**

---

## Live Demo

Frontend: https://lead-desk-mini-gilt-alpha.vercel.app/

Backend API: https://leaddesk-mini-z51d.onrender.com/

---

## Demo Credentials

### Admin

Email: admin@gmail.com

Password: Admin123

### Member

Email: member@gmail.com

Password: Member@123

---

## Features

### Authentication

- JWT Authentication
- Secure password hashing using bcrypt
- Protected routes
- Role-based access control

### Lead Management

- Create leads
- Edit leads
- Delete leads
- View lead details

### Lead Lifecycle

- Status pipeline
  - New
  - Contacted
  - Qualified
  - Proposal Sent
  - Closed Won
  - Closed Lost

- Lead assignment
- Notes with timestamps
- Activity history

### Dashboard

- Search leads
- Filter by status
- Filter by assigned member
- Pagination
- Lead statistics

### Public Lead Capture

- Public lead submission form
- Automatically creates new leads

---
## Architecture

LeadDesk Mini follows a client-server architecture.

Frontend
- React
- React Router
- Axios
- Tailwind CSS

Backend
- Express REST API
- JWT Authentication
- Role-Based Authorization
- Express Validator

Database
- MongoDB
- Mongoose ODM

Testing
- Jest
- Supertest

Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
---
## Role Permissions

### Admin

- Create leads
- Edit leads
- Delete leads
- Assign leads
- View all leads
- Update lead status
- View activity history
- Manage members

### Member

- View assigned leads only
- Update status of assigned leads
- Add notes
- View activity history of assigned leads
---

## Security

- JWT Authentication
- Password hashing using bcrypt
- Protected API routes
- Role-based authorization
- Express Validator request validation
---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### Testing

- Jest
- Supertest

---

## Project Structure

```
LeadDesk-Mini/
│
├── frontend/
├── backend/
└── README.md
└── TASKB.md
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Leads

| Method | Endpoint |
|--------|----------|
| GET | /api/leads |
| POST | /api/leads |
| GET | /api/leads/:id |
| PUT | /api/leads/:id |
| DELETE | /api/leads/:id |
| PUT    | /api/leads/:id/assign |
| PUT | /api/leads/:id/status |
| POST | /api/leads/:id/notes |

### Users

| Method | Endpoint |
|--------|----------|
| GET | /api/users |

### Public

| Method | Endpoint |
|--------|----------|
| POST | /api/public/lead |

---
## Data Model

User

- name
- email
- password
- role

Lead

- name
- email
- company
- phone
- status
- assignedTo
- createdBy
- notes
- activity
- createdAt
- updatedAt
---

## Automated Tests

The project includes integration tests using Jest and Supertest.

Covered Scenarios

- User Registration
- User Login
- Invalid Login
- Admin creates lead
- Member permission validation
- Admin assigns lead

Run tests

npm test
---

## Deployment

Frontend: https://lead-desk-mini-gilt-alpha.vercel.app/

Backend: https://leaddesk-mini-z51d.onrender.com/

---

## Credits

Built for **Digital Heroes Training Task**

https://digitalheroesco.com
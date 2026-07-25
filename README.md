# LeadDesk Mini CRM

A full-stack Lead Management CRM built for small sales teams. The application enables lead capture, lead assignment, tracking, and lifecycle management with secure role-based access.

**Built for Digital Heroes Training Task**

---

## Live Demo

Frontend: Coming Soon

Backend API: Coming Soon

---

## Demo Credentials

### Admin

Email: admin@example.com

Password: ********

### Member

Email: member@example.com

Password: ********

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
| PATCH | /api/leads/:id |
| DELETE | /api/leads/:id |
| PATCH | /api/leads/:id/assign |
| PATCH | /api/leads/:id/status |
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

## Testing

Run all tests:

```bash
npm test
```

---

## Screenshots

### Login

(Add screenshot)

### Dashboard

(Add screenshot)

### Lead Details

(Add screenshot)

### Public Lead Form

(Add screenshot)

---

## Deployment

Frontend: https://lead-desk-mini-gilt-alpha.vercel.app/

Backend: https://leaddesk-mini-z51d.onrender.com/

---

## Credits

Built for **Digital Heroes Training Task**

https://digitalheroesco.com
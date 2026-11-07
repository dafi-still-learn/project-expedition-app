# 📦 Project Expedition App

A web-based expedition management application designed to manage and monitor package delivery processes, from warehouse operations to final customer delivery.

> 🚧 **Development Status: In Progress**
>
> This project is currently under active development as part of a Project-Based Learning initiative. Features, architecture, and implementation may change as development progresses.

---

## 📖 About the Project

**Project Expedition App** is a web application developed to support expedition and logistics management operations.

The application aims to provide a centralized platform for managing users, packages, shipment processes, and delivery status monitoring.

It implements a **Role-Based Access Control (RBAC)** approach to separate permissions and responsibilities between different user roles, particularly Administrators and Operators.

The primary goal is to build an application that provides a structured workflow for managing package deliveries, improving operational visibility, and maintaining shipment records.

### Project Objectives

- Develop a centralized expedition management system.
- Implement authentication and authorization mechanisms.
- Apply role-based access control for different user responsibilities.
- Manage package information and shipment records.
- Monitor package delivery progress.
- Practice software engineering concepts through real-world project implementation.

---

## ✨ Features & Development Progress

Features are categorized based on their current development status.

### Authentication & Authorization
- [x] User authentication.
- [x] JWT-based authentication.
- [x] Role-based access control.
- [ ] Session and token lifecycle improvements.

### User Management
- [ ] Create operator accounts.
- [ ] Update user information.
- [ ] Delete or deactivate user accounts.
- [ ] Manage user roles and permissions.

### Package Management
- [ ] Register new packages.
- [ ] Update package information.
- [ ] Manage package records.
- [ ] Assign packages to shipment processes.

### Shipment Management
- [ ] Manage shipment information.
- [ ] Update shipment status.
- [ ] Record package movement history.
- [ ] Monitor delivery progress.

### Dashboard & Analytics
- [ ] Display shipment statistics.
- [ ] Show package delivery summaries.
- [ ] Visualize shipment activity.
- [ ] Generate operational reports.

*Note: Development progress is updated as features are implemented and tested.*

---

## 🛠️ Technology Stack

The application uses the following technologies:

### Frontend
- **React.js** — Building interactive user interfaces.
- **TypeScript** — Providing static type checking.
- **JavaScript** — Application logic and functionality.

### Backend
- **Python** — Backend programming language.
- **FastAPI** — Building RESTful APIs and handling backend operations.

### Database
- **PostgreSQL** — Relational database management system.

---

## 🏗️ System Architecture

The application follows a client-server architecture.

Each component has a separate responsibility:

| Component | Responsibility |
|---|---|
| Frontend | User interface and client-side interactions |
| Backend | Business logic, API endpoints, authentication, and authorization |
| Database | Persistent storage and relational data management |

### Application Flow

```text
+----------------------+
|      React.js        |
|      Frontend        |
+----------+-----------+
           |
           | HTTP Requests
           | REST API
           |
+----------v-----------+
|       FastAPI        |
|       Backend        |
+----------+-----------+
           |
           | Database Queries
           |
+----------v-----------+
|     PostgreSQL       |
|       Database       |
+----------------------+
```

---

## 📁 Project Structure

The following represents the planned project structure. It may evolve as development progresses.

```text
project-expedition-app/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── services/
│   │   └── database/
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run the application locally.

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Python](https://www.python.org/) (v3.10 or later)
- [PostgreSQL](https://www.postgresql.org/) (v14 or later)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/<username>/project-expedition-app.git

cd project-expedition-app
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

**Linux / macOS**
```bash
source venv/bin/activate
```

**Windows**
```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the development server:

```bash
uvicorn main:app --reload
```

Backend API:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend development server:

```text
http://localhost:5173
```

*Note: The actual frontend address may vary depending on your Vite configuration.*

---

## ⚙️ Environment Configuration

Environment variables are used to store application configuration and sensitive information.

### Backend

Create a `.env` file inside the backend directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/expedition_db

SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend

Create a `.env` file inside the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Security Notice:**
- Never commit `.env` files containing credentials or secret keys.
- Keep sensitive configuration on the backend.
- Use `.env.example` to provide configuration templates.
- Never expose private keys or authentication secrets through frontend environment variables.

---

## 🗺️ Development Roadmap

The project is developed incrementally through several development phases.

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Initial project setup | In Progress |
| Phase 2 | Authentication & Authorization | In Progress |
| Phase 3 | User Management | Planned |
| Phase 4 | Package Management | Planned |
| Phase 5 | Shipment Management | Planned |
| Phase 6 | Dashboard & Analytics | Planned |
| Phase 7 | Testing & Optimization | Planned |
| Phase 8 | Deployment | Planned |

---

## 🧠 Development Philosophy

This project follows a **Project-Based Learning (PBL)** approach, focusing on practical software development and continuous improvement.

The development process emphasizes:

- Understanding software architecture and application design.
- Implementing authentication and authorization securely.
- Designing relational database structures.
- Developing RESTful APIs.
- Integrating frontend and backend applications.
- Applying modular and maintainable coding practices.
- Learning through experimentation, implementation, and problem-solving.

The project is continuously improved as new concepts and technologies are explored.

---

## 👤 Author

**Nur Fauzan Muhammad Khadafi**

Independently developed as a Project-Based Learning initiative.

---

## 📌 Project Notes

This application is currently under active development and is not intended for production use.

The architecture, features, and implementation details may change throughout the development process.

Feedback, suggestions, and constructive discussions are welcome.

---

## 📄 License

No license has been assigned to this project yet.

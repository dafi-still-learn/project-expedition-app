# Learning Guide for Expedition App

## Table of Contents
1. [Project Overview](#project-overview)
2. [Core Concepts](#core-concepts)
3. [Data Flow Architecture](#data-flow-architecture)
4. [React Components & Hooks](#react-components--hooks)
5. [API Integration & Authentication](#api-integration--authentication)
6. [Database Interaction](#database-interaction)
6. [Chart.js Implementation](#chart-js-implementation)
7. [Debugging Techniques](#debugging-techniques)
7. [Best Practices](#best-practices)
8. [Resources & References](#resources--references)

## Project Overview
The Expedition App is a full-stack application with:
- Frontend: React + Chart.js + React Router
- Backend: FastAPI (Python) with PostgreSQL
- Authentication: JWT + Cookies
- Data Visualization: Real-time charts using Chart.js
- Data Flow: REST API with RESTful design

## Core Concepts

### 1. RESTful API Design
- RESTful endpoints follow resource-based naming conventions
- GET requests for data retrieval
- POST for data creation
- PUT/PUT for updates
- DELETE for deletion
- Proper HTTP status codes (200, 201, 404, 500)

### 2. Data Flow Architecture
```
Frontend (React) 
  → REST API Calls (Axios) 
  → Backend (FastAPI) 
  → Database (PostgreSQL) 
  → Business Logic (Python)
  → Database (PostgreSQL)
  → Backend (FastAPI) 
  → REST API 
  → Frontend (React)
```

### 2. Core Components
- **Frontend**: React components, hooks, state management
- **Backend**: FastAPI routes, database models, business logic
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with cookie-based session management

## 3. Data Flow Architecture

### Data Flow Sequence
1. User interaction triggers event (e.g., view dashboard)
2. React component triggers hook (e.g., `useGetDataPaket`)
3. Hook makes API request to `/packet/all`
4. Backend service processes request:
   - Connects to database
   - Executes SQL query
   - Returns JSON response
5. Frontend receives data and updates state
6. Component re-renders with new data
7. Chart.js renders updated visualization

### 3. Data Flow Diagram
```
[User] → [React Component] → [Custom Hook] 
  → [Axios Request] → [Backend API] 
  → [Database Query] → [Response] 
  → [State Update] → [Component Re-render] 
  → [Chart.js Rendering]
```

## 4. React Components & Hooks

### 4.1 Component Structure
- **Layout Components**: Layout, Navbar, Sidebar
- **Page Components**: Dashboard, Setting, Expedition
- **Chart Components**: DiagramLine, DiagramBarPacket, DiagramPieFinansial
- **Utility Components**: LoadingSpinner, ErrorBoundary

### 4.1.1 Component Hierarchy
```
App
 └── ExpeditionPage
     ├── Sidebar
     └── MainContent
         ├── Dashboard
         ├── Setting
         └── Expedition
```

### 4.2 Custom Hooks
Custom hooks are reusable logic abstractions. Key hooks used:

1. **useGetDataPaket** - Data fetching hook for paket data
2. **useAuth** - Authentication state management
3. **useEffect** - Side effects management (data fetching, subscriptions)

### 4.2.1 Custom Hook Best Practices
- Use descriptive names (e.g., `useGetDataPaket` not `useGetData`)
- Return consistent data structures
- Handle loading and error states
- Clean up subscriptions/cleanup effects
- Avoid side effects in render phase

## 5. API Integration & Authentication

### 5.1 API Client (Axios)
- Base URL: `http://localhost:8000`
- Headers: `Authorization: Bearer {token}`
- `withCredentials: true` for cookie-based auth
- Error handling with try/catch

### 5.1.1 Authentication Flow
1. User logs in → receives token
2. Token stored in state (or context)
3. Token sent in Authorization header for protected routes
4. Token refresh via `/auth/refresh_token` endpoint
5. Cookies handle session persistence

### 5.2. Authentication Flow
1. User enters credentials → POST to `/auth/login`
2. Server validates credentials → returns access token
3. Access token stored in state
4. Protected routes check for token validity
5. Token refresh when expired (using refresh token)

## 6. Database Interaction

### 6.1 Database Schema
Main tables:
- `paket` - core data structure
- `resi_paket` - resi records linked to paket
- `customers` - customer information linked to paket
- `users` - application users

### 6.1.1 Query Examples
```python
# Get all paket data
cursor.execute("SELECT * FROM paket")

# Get specific paket by ID
cursor.execute("SELECT * FROM paket WHERE id = %s", (id,))

# Insert new paket
cursor.execute("""
    INSERT INTO paket (nama_paket, jenis_paket, jumlah_paket, ...)
    VALUES (%s, %s, %s, ...)
""", (nama, jenis, jumlah, ...))
```

### 6.2 ORM Usage
Using SQLAlchemy for database operations:
```python
# Query example
result = session.query(Paket).filter(Paket.id == 1).first()

# Insert example
new_paket = Paket(nama_paket="Paket A", jumlah_paket=5)
session.add(new_paket)
session.commit()
```

## 7. Chart.js Implementation

### 6.1 Chart.js Basics
- **Chart Types**: line, bar, pie, doughnut, radar
- **Core Concepts**: datasets, labels, options
- **Rendering**: canvas element with Chart.js library

### 6.1.1 Chart.js Implementation Steps
1. Import Chart.js library
2. Create canvas element
3. Define data structure:
   - labels: array of strings
   - datasets: array of data series
4. Create chart instance
5. Handle responsive design

### 6.1.1 Chart.js Data Structure
```javascript
const data = {
  labels: ['Mon', 'Tue', 'Wed'],
  datasets: [{
    label: 'Sales',
    data: [100, 150, 200],
    backgroundColor: 'rgba(75, 192, 192, 0.2)'
  }]
}
```

### 6.1.1 Chart.js Options
```javascript
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
```

## 7. Debugging Techniques

### 7.1 Frontend Debugging
- `console.log()` for variable inspection
- `Array.isArray()` to verify data type
- `Array.isArray(data)` before `.map()`
- Use `try/catch` for async operations
- Use React DevTools for component inspection

### 7.2 Backend Debugging
- Print data before returning
- Use `print()` for SQL queries and results
- Use `try/except` for error handling
- Print request/response details

### 7.3 CORS Debugging
- Check `Access-Control-Allow-Origin` header
- Verify origins match frontend URL
- Ensure credentials are enabled
- Test with curl or Postman

## 7. Best Practices

### 7.1 Code Quality
- Use consistent naming conventions
- Write descriptive function names
- Comment complex logic
- Follow PEP8 for Python
- Use ESLint for JavaScript

### 8. Best Practices

### 7.1 Code Quality
- Use consistent naming conventions
- Write descriptive function names
- Comment complex logic
- Follow PEP8 for Python
- Use ESLint for JavaScript

### 8.1 Error Handling
- Implement proper error handling in API calls
- Show user-friendly error messages
- Log errors for debugging
- Implement retry logic for network issues

### 7.3 State Management
- Use context for global state
- Use hooks for component-specific logic
- Keep state minimal and focused
- Use useReducer for complex state logic

## 8. Resources & References

### 7.1 Documentation
- [React Documentation](https://reactjs.org/docs/react-api.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)

### 7.2 Learning Resources
- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [Chart.js Tutorial](https://www.chartjs.org/docs/latest/getting-started/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

### 7.3 Tools
- [Postman](https://www.postman.com/) - API testing
- [PostgreSQL](https://www.postgresql.org/) - database
- [PostgreSQL Workbench](https://www.pgadmin.org/) - database management
- [React DevTools](https://reactjs.org/blog/2020/08/17/new-react-devtools.html) - component inspection

## 8. Best Practices

### 7.1 Code Quality
- Use consistent naming conventions
- Write descriptive function names
- Comment complex logic
- Follow PEP8 for Python
- Use ESLint for JavaScript

### 7.1 Error Handling
- Implement proper error handling in API calls
- Show user-friendly error messages
- Log errors for debugging
- Implement retry logic for network issues

### 7.3 State Management
- Use context for global state
- Use hooks for component-specific logic
- Keep state minimal and focused
- Use useReducer for complex state logic

## 8. Resources & References

### 7.1 Documentation
- [React Documentation](https://reactjs.org/docs/react-api.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)

### 7.2 Learning Resources
- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [Chart.js Tutorial](https://www.chartjs.org/docs/latest/getting-started/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

### 7.3 Tools
- [Postman](https://www.postman.com/) - API testing
- [PostgreSQL](https://www.postgresql.org/) - database
- [PostgreSQL Workbench](https://www.pgadmin.org/) - database management
- [React DevTools](https://reactjs.org/blog/2020/08/17/new-react-devtools.html) - component inspection

## 8. Best Practices

### 7.1 Code Quality
- Use consistent naming conventions
- Write descriptive function names
- Comment complex logic
- Follow PEP8 for Python
- Use ESLint for JavaScript

### 7.1 Error Handling
- Implement proper error handling in API calls
- Show user-friendly error messages
- Log errors for debugging
- Implement retry logic for network issues

### 7.3 State Management
- Use context for global state
- Use hooks for component-specific logic
- Keep state minimal and focused
- Use useReducer for complex state logic

---

*This learning document serves as a comprehensive reference for understanding the expedition application's architecture, implementation details, and best practices. It serves as a foundation for future development and maintenance.*

---

*This document was created to help document the learning process and serve as a reference for future development and troubleshooting.*
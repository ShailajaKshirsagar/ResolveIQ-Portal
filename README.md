# ResolveIQ – Complaint Management System

A full-stack complaint management system for students and admins.

| Part | Tech | Folder | Port |
|------|------|--------|------|
| Frontend | React 19 + Vite | `frontend/` | 5173 |
| Backend | Spring Boot (Java 17) + PostgreSQL | `backend/` | 8080 |

## Prerequisites
- JDK 17+
- Node.js 18+ (20+ recommended)
- PostgreSQL running locally with a database named `resolveiq_cms_db`

## Run the backend
```bash
cd backend
./mvnw spring-boot:run        # Mac/Linux
mvnw.cmd spring-boot:run      # Windows
```
Configure DB, mail and Gemini settings in `backend/src/main/resources/application.properties`.
Swagger UI: http://localhost:8080/swagger-ui.html

## Run the frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

> Start the backend first. CORS on the backend allows only `http://localhost:5173`.

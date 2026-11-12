# ResolveIQ – AI-Powered Grievance Management Portal

An AI-powered web application that simplifies college grievance management through intelligent complaint categorization, centralized tracking, and automated notifications.

![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-Frontend-blue?logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?logo=mysql)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple)
![JWT](https://img.shields.io/badge/Security-JWT-black?logo=jsonwebtokens)

## About the Project

**ResolveIQ** is a smart grievance management portal designed to make the college complaint-handling process more organized, transparent, and efficient.

It provides separate dashboards for students and administrators, allowing students to submit and track complaints while administrators can manage grievances, monitor progress, and generate reports.

## Key Features

- **AI-Powered Categorization:** Automatically categorizes student complaints using AI.
- **Student Dashboard:** Submit complaints, track their status, and view complaint history.
- **Admin Dashboard:** Manage complaints, update statuses, and monitor grievance statistics.
- **Email Notifications:** Keeps students informed about complaint updates.
- **Automated Excel Reports:** Generate downloadable reports for grievance records.
- **Secure Authentication:** JWT-based authentication with role-based access control.
- **Complaint Tracking:** Supports Pending, In Progress, Resolved, Reopened, and Rejected statuses.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js |
| Backend | Java, Spring Boot |
| Database | MySQL |
| AI Integration | Groq API |
| Security | Spring Security, JWT |
| API Testing | Postman, Swagger |
| DevOps | Docker, GitHub Actions |

## Screenshots

<!-- Add your actual project screenshots here -->

### Student Dashboard
<!-- ![Student Dashboard](docs/screenshots/student-dashboard.png) -->
<img width="1917" height="910" alt="{A4FC77E9-50ED-44E4-A607-A0D13E95DC4E}" src="https://github.com/user-attachments/assets/bb91c6e8-6b03-4d43-9d39-982dfd43a246" />

### Admin Dashboard
<!-- ![Admin Dashboard](docs/screenshots/admin-dashboard.png) -->
<img width="1906" height="910" alt="{DE82CEF1-C7B7-48F7-9657-DE6C5C82255E}" src="https://github.com/user-attachments/assets/d33a4a7b-78db-4890-9da6-b565f19188f5" />


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ShailajaKshirsagar/ResolveIQ-Portal.git
cd ResolveIQ-Portal
```

### 2. Run the Backend

```bash
cd backend
```

Configure your database and required environment variables, then run:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

### 3. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

If your frontend uses Vite, use `npm run dev` instead.

## Configuration

Configure the required application properties using environment variables, including:

- Database connection details
- Database username and password
- AI API key
- JWT secret
- Email service credentials

**Note:** Never commit API keys, passwords, or other sensitive credentials to GitHub.

## Future Enhancements

- Advanced grievance analytics
- Improved AI-based complaint insights
- Additional reporting and dashboard capabilities

## Author

**Shailaja Kshirsagar**

- [GitHub](https://github.com/ShailajaKshirsagar)
- [LinkedIn](https://linkedin.com/in/shailaja-kshirsagar)

---

⭐ If you find this project interesting, consider giving the repository a star!

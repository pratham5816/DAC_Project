DAC Project – Student Management System

A full-stack web application designed to manage academic operations for educational institutions. This project was started as part of the PG-DAC curriculum to understand real-world full-stack development, but was paused midway due to a change in plans. Despite this, it provided strong hands-on learning across frontend, backend, and API integration.

Project Status

Status: Discontinued (Midway)
Reason: Change of project direction and learning priorities
Outcome: Gained practical experience with full-stack architecture, REST APIs, React, Spring Boot, and MySQL integration.

Features Implemented
Student Module

Email-based login (basic authentication logic)

View profile details

Access notices

View subject-wise marks

Teacher Module

Teacher dashboard

Create and view notices

View student lists

Class-wise data access

Admin Module

Manage students and teachers

View system-wide data

Manage notices

Note: Authentication and APIs were not fully secured and the project was stopped before implementing proper security mechanisms.

## 🛠️ Technology Stack

### Backend
- **Java 17** - Modern Java features and performance improvements
- **Spring Boot 3.x** - Enterprise-grade framework for rapid development
- **Spring Data JPA** - Simplified data access with JPA repositories
- **MySQL Database** - Reliable relational database for data persistence
- **Maven** - Dependency management and build automation
- **RESTful APIs** - Clean and scalable API architecture

### Frontend
- **React 19.2.0** - Latest React with modern hooks and compiler optimizations
- **Material-UI 7.3.6** - Beautiful, responsive component library
- **React Router 7.9.6** - Client-side routing and navigation
- **Axios** - Promise-based HTTP client for API calls
- **Vite with Rolldown** - Lightning-fast build tool and development server
- **Bootstrap 5.3** - Responsive grid system and utilities

## 📁 Project Structure

```
DAC_PROJECT/
├── Back-End/
│   └── DAC_Project/
│       ├── src/main/java/com/app/
│       │   ├── controller/    # REST API controllers
│       │   ├── model/         # Entity classes
│       │   ├── repository/    # JPA repositories
│       │   └── service/       # Business logic layer
│       └── pom.xml            # Maven configuration
│
└── Front-End/
    └── DAC/
        ├── src/
        │   ├── components/    # Reusable React components
        │   ├── pages/         # Application pages
        │   ├── services/      # API service layers
        │   └── styles/        # CSS stylesheets
        └── package.json       # npm dependencies
```

## Installation & Setup

### Prerequisites
- Java 17 or higher
- Node.js 18+ and npm
- MySQL 8.0+
- Git

### Backend Setup
```bash
cd Back-End/DAC_Project
./mvnw clean install
./mvnw spring-boot:run
```
Backend will run on `http://localhost:8080`

### Frontend Setup
```bash
cd Front-End/DAC
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

### Database Configuration
Update `application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dac_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## API Endpoints
- `POST /student/checkLogin` - Student authentication
- `POST /teacher/checkLogin` - Teacher authentication
- `GET /student/{id}` - Fetch student profile
- `GET /student/Notice` - Retrieve all notices
- `GET /student/getAll` - Get all students
- `GET /teacher/{id}/classes` - Teacher's class information

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available for educational purposes.

## Developer
**Pratham** - [GitHub Profile](https://github.com/pratham5816)

---

Star this repository if you find it helpful!

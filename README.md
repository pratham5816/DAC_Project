# 🎓 DAC Project - Student Management System

A comprehensive full-stack web application designed to streamline academic operations for educational institutions. This modern Student Management System facilitates seamless interaction between students, teachers, and administrators through an intuitive interface and robust backend architecture.

## 🚀 Features

### For Students
- **Secure Authentication** - Email-based login system with session management
- **Personalized Dashboard** - View profile information, grades, and academic performance
- **Real-time Notices** - Stay updated with institutional announcements and important updates
- **Grade Tracking** - Access subject-wise marks and performance analytics
- **Profile Management** - View and manage personal information and contact details

### For Teachers
- **Teacher Dashboard** - Overview of classes, students, and teaching statistics
- **Notice Management** - Create, publish, and manage notices for students
- **Student Overview** - Access complete student roster with detailed information
- **Class Management** - Track and manage multiple classes efficiently
- **Performance Monitoring** - View student statistics and academic progress

### For Administrators
- **User Management** - Manage student and teacher accounts
- **System Overview** - Monitor overall system usage and statistics
- **Notice Board Control** - Oversee institutional communications
- **Data Analytics** - Access comprehensive reports and insights

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

## ⚙️ Installation & Setup

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

## 🔐 Security Features
- Password-based authentication system
- Role-based access control (Student, Teacher, Admin)
- CORS configuration for secure cross-origin requests
- Session management with localStorage
- Secure API endpoints with validation

## 🎯 Key Highlights
- **Modern Tech Stack** - Built with latest versions of React 19 and Spring Boot 3
- **Responsive Design** - Mobile-first approach ensuring seamless experience across devices
- **Clean Architecture** - Separation of concerns with MVC pattern and service layers
- **RESTful APIs** - Well-structured endpoints following REST principles
- **Scalable Codebase** - Modular structure allowing easy feature additions

## 📊 API Endpoints
- `POST /student/checkLogin` - Student authentication
- `POST /teacher/checkLogin` - Teacher authentication
- `GET /student/{id}` - Fetch student profile
- `GET /student/Notice` - Retrieve all notices
- `GET /student/getAll` - Get all students
- `GET /teacher/{id}/classes` - Teacher's class information

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is open source and available for educational purposes.

## 👨‍💻 Developer
**Pratham** - [GitHub Profile](https://github.com/pratham5816)

---

⭐ Star this repository if you find it helpful!

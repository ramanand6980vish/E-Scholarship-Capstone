# 🎓 E-Scholarship Management System

A web-based **E-Scholarship Management System** developed as a college capstone project to simplify and automate the scholarship application, document submission, verification, and status-tracking process.

The system provides separate interfaces for **Students** and **State Officers**, allowing students to submit scholarship applications online while officers can review and manage submitted applications.

---

## 📌 Project Overview

The E-Scholarship Management System is designed to reduce the manual effort involved in scholarship application processing.

Students can:

* Register/Login securely
* Apply for available scholarships
* Select scholarship categories
* Submit personal and academic information
* Upload required documents
* Submit bank details
* Track application status
* Re-upload documents when required
* Receive application-related notifications

State Officers can:

* Login to the officer dashboard
* View submitted scholarship applications
* Review student information
* Check submitted documents
* Verify application-related information
* Manage applications requiring corrections

---

## 🚀 Key Features

### 👨‍🎓 Student Module

* Student authentication
* JWT-based login
* Scholarship application submission
* Pre-Matric and Post-Matric scholarship categories
* Support for different scholarship categories
* Personal information management
* Academic information
* Bank account details
* Document upload
* Document re-upload
* Application status tracking
* Application ID-based tracking
* Student notifications

### 👨‍💼 State Officer Module

* Officer authentication
* Officer dashboard
* View submitted applications
* Search application information
* Review uploaded documents
* Check income-related information
* Manage applications
* Request document re-upload where required

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router
* REST API integration
* Local Storage

### Backend

* Java
* Spring Boot
* Spring REST
* Spring Security
* JWT Authentication

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Eclipse / IntelliJ IDEA
* MySQL Workbench
* Git & GitHub
* Postman

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       Student       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
                         REST APIs
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘
                               ▲
                               │
                         REST APIs
                               │
                    ┌──────────┴──────────┐
                    │                     │
             ┌──────┴───────┐     ┌──────┴───────┐
             │    Student   │     │ State Officer│
             │   Dashboard  │     │   Dashboard  │
             └──────────────┘     └──────────────┘
```

---

# 📂 Project Structure

The project is divided into frontend and backend applications.

```text
E-Scholarship-Capstone/
│
├── capstone-frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── package.json
│   └── README.md
│
├── capstone-backend/
│   │
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── ...
│
└── README.md
```

> The exact folder names may vary depending on the version of the project uploaded to the repository.

---

# ⚙️ Prerequisites

Before running the project, install the following:

* Java JDK 17 or compatible version
* Node.js
* npm
* MySQL
* Git
* Maven

Check the installations:

```bash
java -version
node -v
npm -v
mysql --version
mvn -version
```

---

# 🗄️ Database Setup

### 1. Start MySQL

Make sure your MySQL server is running.

### 2. Create the database

Open MySQL Workbench or MySQL command line and create the database used by the backend.

Example:

```sql
CREATE DATABASE escholarship;
```

### 3. Configure database credentials

Open the backend configuration file:

```text
src/main/resources/application.properties
```

Update the database configuration according to your local MySQL setup.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/escholarship
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace:

```text
YOUR_PASSWORD
```

with your MySQL password.

> Use the database name, username, password, and other properties from your actual backend configuration if they are different.

---

# ▶️ How to Run the Backend

Navigate to the backend project:

```bash
cd capstone-backend
```

Run the Spring Boot application using Maven:

```bash
mvn spring-boot:run
```

Or run the main Spring Boot application from Eclipse/IntelliJ.

The backend will normally start at:

```text
http://localhost:8080
```

The actual port depends on your `application.properties`.

---

# ▶️ How to Run the Frontend

Open a new terminal and navigate to the React project:

```bash
cd capstone-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

If the project uses Vite instead of Create React App, use:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

or, for Vite:

```text
http://localhost:5173
```

---

# 🔐 Authentication Flow

The application uses authentication to separate Student and State Officer access.

### Student

```text
Student
   ↓
Login
   ↓
JWT Authentication
   ↓
Student Dashboard
   ↓
Apply / Track / Update Application
```

### State Officer

```text
State Officer
      ↓
Officer Login
      ↓
Authentication
      ↓
Officer Dashboard
      ↓
Review Applications
      ↓
Verify Documents / Request Re-upload
```

---

# 🔄 Scholarship Application Workflow

```text
Student Login
      ↓
Select Scholarship Category
      ↓
Enter Personal Details
      ↓
Enter Academic Details
      ↓
Enter Bank Details
      ↓
Upload Documents
      ↓
Submit Application
      ↓
Application ID Generated
      ↓
Officer Reviews Application
      ↓
Application Status Updated
      ↓
Student Tracks Status
```

---
 
 
 

# 👨‍💻 My Role in the Project

I primarily worked on the **frontend development** of the E-Scholarship Management System.

My responsibilities included designing and developing the React-based user interface, implementing student application workflows, integrating frontend components with backend REST APIs, handling application status and document-related screens, and developing the State Officer dashboard interface.

I also worked on frontend data handling, navigation, form handling, API integration, and user-facing application flows.

---

# 🎯 Project Objective

The primary objective of the project is to provide a centralized digital platform for scholarship applications and verification.

The system aims to:

* Reduce paperwork
* Simplify scholarship applications
* Provide centralized application information
* Improve document submission and verification
* Allow students to track their applications
* Help officers manage scholarship applications efficiently

---

# 🔮 Future Enhancements

Possible future improvements include:

* Online payment/status integration where applicable
* Email and SMS notifications
* Advanced document verification
* Aadhaar-based authentication integration
* Cloud deployment
* Role-based access control improvements
* Application analytics and reporting
* Mobile application support
* Automated document validation

---

# 📚 Learning Outcomes

Through this project, I gained practical experience in:

* React.js frontend development
* REST API integration
* Java and Spring Boot
* MySQL database integration
* Authentication and JWT
* Form handling
* File/document upload workflows
* Frontend-backend integration
* Git and GitHub
* Team-based software development

---

# 👤 Author

**Ramanand Vishwakarma**

Java Full Stack Developer

* LinkedIn: [ramanand-vishwakarma](https://www.linkedin.com/in/ramanand-vishwakarma/)
* GitHub: [ramanand6980vish](https://github.com/ramanand6980vish)

---

## ⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

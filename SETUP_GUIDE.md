# Mall Project - Full Stack Setup Guide

## 📋 Overview

This is a full-stack application with:
- **Backend**: Spring Boot 4.0.1 (Java 17) REST API
- **Frontend**: React 18 web application

## 🚀 Quick Start

### Prerequisites
- Java 17+ 
- Node.js 14+ and npm
- Git

### Step 1: Backend Setup

```bash
cd mallproject

# Build the project
.\mvnw clean package -DskipTests

# Run the Spring Boot application
.\mvnw spring-boot:run
```

Backend will be available at: `http://localhost:9090`

### Step 2: Frontend Setup

In a new terminal:

```bash
cd mallproject/frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will be available at: `http://localhost:3000`

## 📁 Project Structure

```
mallproject/
├── src/main/java/com/avn/mallproject/
│   ├── config/
│   │   └── CorsConfig.java          # CORS configuration
│   ├── controller/                   # REST Controllers
│   │   ├── CustomerController.java
│   │   ├── EmployeeController.java
│   │   ├── ItemController.java
│   │   ├── MallController.java
│   │   ├── OrderController.java
│   │   ├── ShopController.java
│   │   └── UserController.java
│   ├── entity/                       # JPA Entities
│   ├── repository/                   # Spring Data Repositories
│   ├── service/                      # Business Logic
│   └── MallprojectApplication.java   # Main Application
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/               # React Components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── pom.xml                           # Maven Configuration
```

## 🔌 API Endpoints

### Malls
- `GET /api/malls` - Get all malls
- `POST /api/malls` - Create new mall
- `GET /api/malls/{id}` - Get mall by ID
- `PUT /api/malls/{id}` - Update mall
- `DELETE /api/malls/{id}` - Delete mall

### Shops
- `GET /api/shops` - Get all shops
- `POST /api/shops` - Create new shop
- `GET /api/shops/{id}` - Get shop by ID
- `PUT /api/shops/{id}` - Update shop
- `DELETE /api/shops/{id}` - Delete shop

### Customers
- `GET /customers` - Get all customers
- `POST /customers` - Create new customer
- `GET /customers/{id}` - Get customer by ID
- `PUT /customers/{id}` - Update customer
- `DELETE /customers/{id}` - Delete customer

### Employees
- `GET /employees` - Get all employees
- `POST /employees` - Add employee

### Items
- `POST /items/shop/{shopId}` - Add item to shop
- `GET /items/shop/{shopId}` - Get items by shop

## 🛠️ Development

### Backend Development

1. Make changes to Java files
2. Rebuild: `.\mvnw clean compile`
3. Restart the application

### Frontend Development

1. Make changes to React components
2. Changes auto-reload at `http://localhost:3000`
3. Build for production: `npm run build`

## 📦 Building for Production

### Backend
```bash
.\mvnw clean package -DskipTests
```

Creates: `target/mallproject-0.0.1-SNAPSHOT.jar`

### Frontend
```bash
cd frontend
npm run build
```

The production build is automatically copied to Spring Boot's static folder.

## ⚙️ Configuration

### Application Properties

Edit `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=9090

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/malldb
spring.datasource.username=root
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 9090
- Check browser console for CORS errors
- Verify CorsConfig.java is properly loaded

### Port already in use
```bash
# Change frontend port (in package.json)
"start": "PORT=3001 react-scripts start"

# Change backend port (in application.properties)
server.port=8081
```

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf frontend/node_modules
cd frontend && npm install
```

## 📝 Notes

- The frontend will be served from the backend's static folder when deployed
- CORS is configured to allow requests from `localhost:3000`
- Database schema is auto-generated on first run (H2 in-memory by default)

## 📚 Technologies

- **Backend**: Spring Boot, Spring Data JPA, Jakarta Persistence
- **Frontend**: React 18, Axios, CSS3
- **Build**: Maven (Backend), npm (Frontend)
- **Database**: H2 (Development), MySQL/PostgreSQL (Production)

## 🔒 Security Notes

- Update CORS allowed origins for production
- Add authentication/authorization
- Use HTTPS in production
- Validate all user inputs
- Use environment variables for sensitive data

---

**Happy Coding! 🚀**

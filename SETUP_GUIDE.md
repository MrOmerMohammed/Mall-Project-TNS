# Mall Project - Backend Setup Guide

## 📋 Overview

This guide covers the setup and execution of the **Spring Boot Backend** for the Mall Management System.
- **Framework**: Spring Boot 4.0.1 (Java 17)
- **Database**: **PostgreSQL** (Production Standard)
- **Build Tool**: Maven

## 🚀 Quick Start

### Prerequisites
- **Java Development Kit (JDK) 17** or higher
- **Maven** (bundled `mvnw` wrapper is included)
- **Git**
- **PostgreSQL** (Installed and Running)

### Step 1: Configure Database
1.  Ensure PostgreSQL is running on port `5432`.
2.  Create a database named `mall_project`.
3.  Update credentials in `src/main/resources/application.properties` if they differ from default:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/mall_project
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

### Step 2: Build the Project
Open a terminal in the project root (`mallproject/`) and run:

```bash
# Windows
.\mvnw clean package -DskipTests

# Linux/Mac
./mvnw clean package -DskipTests
```

### Step 3: Run the Application
Start the Spring Boot server:

```bash
# Windows
.\mvnw spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

The application will start on: `http://localhost:9090`

## 🔌 API Endpoints

Once the server is running, you can interact with the following endpoints:

### User Registration (Onboarding)
- `POST /api/register/mall-admin` - Register a new Mall Administrator
- `POST /api/register/shop-owner` - Register a new Shop Owner

### Malls
- `GET /api/malls` - List all malls
- `POST /api/malls` - Create a new mall
- `PUT /api/malls/{id}` - Update mall details
- `DELETE /api/malls/{id}` - Remove a mall

### Shops
- `GET /api/shops` - List all shops
- `POST /api/shops` - Register a new shop
- `PUT /api/shop/{id}` - Update shop details

### Items (Inventory)
- `POST /items/shop/{shopId}` - Add an item to a specific shop
- `GET /items/shop/{shopId}` - View inventory of a shop

### Orders
- `POST /api/orders` - Place a new order
- `GET /api/orders` - View all orders

## 🗄️ Database Access

Since this project uses **PostgreSQL**, use your preferred SQL client (like **pgAdmin**, **DBeaver**, or **DataGrip**) to inspect the data.

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `mall_project`
- **Username**: `postgres` (or your configured user)

## ⚙️ Configuration

Application settings are located in `src/main/resources/application.properties`.

### Default Configuration
```properties
# Server Port
server.port=9090

# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/mall_project
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 🛠️ Development Workflow

1.  **Modify Code**: Edit Java files in `src/main/java/com/avn/mallproject`.
2.  **Hot Reload**: If using an IDE like IntelliJ IDEA or Eclipse, changes often reload automatically.
3.  **Manual Rebuild**:
    ```bash
    .\mvnw clean compile
    ```

## 🐛 Troubleshooting

### Port 9090 already in use?
Edit `application.properties` and change `server.port`:
```properties
server.port=8081
```

### Database connection fails?
- Verify PostgreSQL service is running.
- specific check username and password in `application.properties`.
- Ensure the database `mall_project` exists (`CREATE DATABASE mall_project;`).

---
**Happy Coding! 🚀**

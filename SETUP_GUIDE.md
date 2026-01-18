# Mall Project - Backend Setup Guide

## 📋 Overview

This guide covers the setup and execution of the **Spring Boot Backend** for the Mall Management System.
- **Framework**: Spring Boot 4.0.1 (Java 17)
- **Database**: H2 (Development) / PostgreSQL (Production support)
- **Build Tool**: Maven

## 🚀 Quick Start

### Prerequisites
- **Java Development Kit (JDK) 17** or higher
- **Maven** (bundled `mvnw` wrapper is included)
- **Git**

### Step 1: Build the Project

Open a terminal in the project root (`mallproject/`) and run:

```bash
# Windows
.\mvnw clean package -DskipTests

# Linux/Mac
./mvnw clean package -DskipTests
```

### Step 2: Run the Application

Start the Spring Boot server:

```bash
# Windows
.\mvnw spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

The application will start on: `http://localhost:9090`

## � API Endpoints

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

## �️ Database Access

### H2 Console (Development)
The project uses an in-memory H2 database for development.
- **URL**: `http://localhost:9090/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb` (check application.properties if different)
- **Username**: `sa`
- **Password**: (Empty)

## ⚙️ Configuration

Application settings are located in `src/main/resources/application.properties`.

### Default Configuration
```properties
# Server Port
server.port=9090

# H2 Database Config
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
```

## �️ Development Workflow

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
Ensure no other instance of the application is running. For production databases (PostgreSQL/MySQL), verify the credentials in `application.properties`.

---
**Happy Coding! 🚀**

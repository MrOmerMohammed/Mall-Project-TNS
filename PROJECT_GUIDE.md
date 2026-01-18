# Mall Management System - Comprehensive Project Guide

## 1. Introduction
This document provides a deep structural and analytical overview of the **Mall Management System**. It is designed to guide developers, architects, and stakeholders through the system's internal workings, covering architectural decisions, data modeling complexities, and functional workflows.

---

## 2. Structural Analysis

### 2.1 Architectural Pattern
The application utilizes a **Layered Monolithic Architecture** based on the Spring Boot ecosystem. This design promotes separation of concerns:

-   **Presentation Layer (Controllers)**: Handles HTTP request/response cycles and serialization.
    -   *Location*: `com.avn.mallproject.controller`
    -   *Key Characteristic*: Thin layer; delegates all business logic to Services.
-   **Business Layer (Services)**: Encapsulates core business rules, transaction boundaries, and data processing.
    -   *Location*: `com.avn.mallproject.service`
    -   *Key Characteristic*: Interface-based implementation pattern (e.g., `OrderService` interface -> `OrderServiceImpl` class) to support dependency injection and easier testing.
-   **Persistence Layer (Repositories)**: Abstraction over the database using Spring Data JPA.
    -   *Location*: `com.avn.mallproject.repository`
    -   *Key Characteristic*: Extends `JpaRepository` for efficient, query-method-based data access without writing boilerplate SQL.
-   **Domain Layer (Entities)**: Represents the persistent state of business objects.
    -   *Location*: `com.avn.mallproject.entity`

### 2.2 Package Structure Analysis
```
com.avn.mallproject
├── config       # Configuration classes (CORS, Security beans)
├── controller   # REST API definitions (Traffic control)
├── dto          # Data Transfer Objects (Decoupling API from DB)
├── entity       # Database Tables as Java Classes (ORM)
├── repository   # Database Access Logic (DAO pattern)
└── service      # Business Logic (The "Brain" of the app)
    └── impl     # Implementation details
```

---

## 3. Data Analysis & ERD Deep Dive

The database leverages various relationship types to model the real-world hierarchy of a Mall ecosystem.

### 3.1 Core Entity Relationships
1.  **Hierarchical Ownership**:
    -   `Mall` (1) ↔ (N) `Shop`
    -   *Constraint*: A Shop cannot exist without being part of a Mall. Deleting a Mall cascades deletion to all its Shops.
2.  **Inventory Management**:
    -   `Shop` (1) ↔ (N) `Item`
    -   *Constraint*: Items are strictly scoped to a Shop.
3.  **User Identity & Roles**:
    -   `User` (1) ↔ (1) `MallAdmin` / `ShopOwner` / `Customer`
    -   *Analytical Note*: This uses a "Shared Primary Key" or Foreign Key relationship where the core credentials (username/password) live in `User`, while profile details live in the role-specific tables. This "Composition over Inheritance" approach allows flexible role management.
4.  **Transaction Modeling**:
    -   `OrderDetails` Links `Customer` and `Shop`.
    -   *Analytical Note*: An order is a binding contract between *one* customer and *one* shop. Multi-shop orders would likely be split into multiple `OrderDetails` records logically.

### 3.2 Key Database Constraints
-   **Primary Keys**: Auto-incremented `Long` IDs (Identity Strategy).
-   **Cascading**: Strict `CascadeType.ALL` is used for parent-child relationships (e.g., Mall deletion wipes all associated data) to prevent orphaned records.

---

## 4. Functional & Analytical Analysis

This section breaks down the "Business Intelligence" of the application.

### 4.1 Onboarding & Access Control
-   **Problem**: How do we ensure secure entry for different stakeholders?
-   **Solution**: Specialized Registration Controllers (`RegistrationController`).
    -   *Flow*: Request DTO received -> Validate Input -> Create generic `User` -> Create specific Role Entity (e.g., `MallAdmin`) -> Link them transactionally.
-   **Depths**: The separation of `User` from `RoleEntities` allows the system to potentially support multi-role users in the future (e.g., a Shop Owner who is also a Customer) with minimal refactoring.

### 4.2 Order Processing Logic
-   **Class**: `OrderServiceImpl`
-   **Crucial Operations**:
    -   `saveOrder()`: Acts as the checkout commit.
    -   `getOrdersByShopId()`: Enables the "Seller Dashboard" view, allowing shop owners to see only their relevant sales.
-   **Analytical Insight**: The current order system is direct. Future enhancements identified include "Inventory Locking" (deducting stock `quantity` from `Item` upon order) to prevent overselling.

### 4.3 Inventory Management
-   **Context**: Shops manage dynamic catalogs.
-   **Flow**: Items are added via `POST /items/shop/{shopId}`.
-   **Dept**: The system enforces that items must be linked to a valid Shop ID. This Referential Integrity is enforced at both the Database (FK) and Service (Validation) levels.

---

## 5. From Scratch to Production (PostgreSQL Workflow)

This project has been updated to use **PostgreSQL** for robust production-grade data storage. Follow this workflow to go from an empty system to a fully operational deployment.

### 5.1 Environment Preparation ("Scratch")
1.  **Install PostgreSQL**: Download and install PostgreSQL (v14+) on your server or local machine.
2.  **Initialize Database**:
    -   Open your SQL terminal (`psql` or pgAdmin).
    -   Run command: `CREATE DATABASE mall_project;`
    -   *Analytical Note*: We do not create tables manually. The application uses Hibernate (`ddl-auto=create`) to auto-generate the schema based on your Entity classes.

### 5.2 Application Configuration
Your `src/main/resources/application.properties` is already configured for PostgreSQL:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mall_project
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=create
```
*   **Important**: On the very first run, `ddl-auto=create` will drop any existing tables and create new ones. For subsequent production runs, change this to `update` to preserve data.

### 5.3 Deployment ("Production")
1.  **Build the Artifact**:
    ```bash
    .\mvnw clean package -DskipTests
    ```
    This creates a `.jar` file in the `target/` directory.
2.  **Run the Artifact**:
    ```bash
    java -jar target/mallproject-0.0.1-SNAPSHOT.jar
    ```
    The application will start, connect to your PostgreSQL database, and begin listening on port **9090**.

---

## 6. Postman Services & API Testing Guide

To verify the system "from scratch", we use Postman to simulate the entire lifecycle of a mall ecosystem.

### Prerequisite
-   Install Postman.
-   Set Base URL variable: `{{base_url}}` = `http://localhost:9090`.

### Phase 1: Onboarding (The Foundation)
These requests set up the necessary actors in the system.

**1. Register Mall Admin**
*   **Endpoint**: `POST {{base_url}}/api/register/mall-admin`
*   **Purpose**: Creates the Mall Manager and the actual Mall entity simultaneously.
*   **Body**:
    ```json
    {
      "username": "admin_citycenter",
      "password": "securePass123",
      "adminName": "John Doe",
      "email": "john@citycenter.com",
      "mallName": "City Center Mall",
      "mallLocation": "Downtown 5th Ave",
      "mallContact": "555-0199"
    }
    ```

**2. Register Shop Owner**
*   **Endpoint**: `POST {{base_url}}/api/register/shop-owner`
*   **Purpose**: Creates a Tenant (Nike Store) and places them inside the Mall created above.
*   **Body**:
    ```json
    {
      "username": "nike_manager",
      "password": "nikePass123",
      "ownerName": "Mike Jordan",
      "contactNumber": "555-2300",
      "shopName": "Nike Store",
      "shopType": "Retail",
      "mallId": 1
    }
    ```

### Phase 2: Inventory Operations
Now that we have a Shop (ID: 1), we stock it.

**3. Add Inventory**
*   **Endpoint**: `POST {{base_url}}/items/shop/1`
*   **Purpose**: Adds a product to the Nike Store.
*   **Body**:
    ```json
    {
      "itemName": "Air Jordans",
      "price": 199.99,
      "quantity": 50
    }
    ```

### Phase 3: Customer Transactions
The system is now ready for public use.

**4. Create Customer Order**
*   **Endpoint**: `POST {{base_url}}/api/orders`
*   **Purpose**: Simulates a user buying the shoes.
*   **Body**: 
    ```json
    {
      "paymentMode": "CREDIT_CARD",
      "customer": { "id": 101 },  // Assuming Customer 101 exists OR generic handling
      "shop": { "shopId": 1 },
      "totalAmount": 199.99,
      "items": [ ... ] 
    }
    ```

## 7. Summary
This guide transitions the project from a theoretical structure to a tangible, verifiable product. By using **PostgreSQL**, we ensure data longevity. By following the **Postman Phase** guide, team members can validate that all structural components (Mall -> Shop -> Item -> Order) are correctly linked and operational.

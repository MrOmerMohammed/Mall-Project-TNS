# Mall Management System Backend

## 📌 Project Overview
The **Mall Management System** is a Spring Boot-based backend application designed to streamline operations for malls, shops, and customers. It facilitates:
-   **Mall Administration**: Managing mall profiles, locations, and infrastructure.
-   **Tenant Management**: Onboarding shops and assigning Shop Owners.
-   **Inventory & Sales**: Managing products (items) and processing customer orders.
-   **Role-Based Access**: Secure environments for Admins, Shop Owners, and Customers.

## 🚀 Key Features
-   **User Onboarding**: Dedicated APIs for Mall Admins and Shop Owners.
-   **Dynamic Inventory**: Shop-specific item management.
-   **Order Processing**: End-to-end B2C transaction flow.
-   **Scalable Architecture**: Built on Spring Boot with **PostgreSQL** database.

## 🛠️ Technology Stack
-   **Java 17**
-   **Spring Boot 4.0.1**
-   **Spring Data JPA / Hibernate**
-   **PostgreSQL** (Primary Database)
-   **Maven**

## 🏁 Quick Start
1.  **Clone the repo**:
    ```bash
    git clone "https://github.com/MrOmerMohammed/Mall-Project-TNS.git"
    ```
2.  **Configure Database**:
    -   Ensure PostgreSQL is running locally on port `5432`.
    -   Create a database named `mall_project` (Credentials in `application.properties` or environment variables).
3.  **Build the project**:
    ```bash
    ./mvnw clean package -DskipTests
    ```
4.  **Run the application**:
    ```bash
    ./mvnw spring-boot:run
    ```
5.  **Access API**: Base URL `http://localhost:9090`

## 📚 Documentation
For detailed guides, please refer to:
-   [Setup Guide](SETUP_GUIDE.md) - Instructions for running the project.
-   [Project Guide](PROJECT_GUIDE.md) - Comprehensive internal documentation including ERD and API flows.

## 🧪 Testing
-   **Postman**: Use the provided Postman workflows in the Project Guide to test the API from scratch.
-   **Database Verification**: Use a PostgreSQL client (like pgAdmin or DBeaver) to verify schema creation and data persistence.

---
**Happy Coding!**

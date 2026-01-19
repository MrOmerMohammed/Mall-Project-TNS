# Mall Project - Postman API Testing Guide

This guide provides the exact JSON payloads and steps to test the `Mall Management System` backend using Postman.

## 📋 Prerequisites
1.  **Run the Application**: Ensure the backend is running on `http://localhost:9090`.
2.  **Database**: Ensure PostgreSQL is running and connected.

---

## 🚀 Step 1: Mall Admin Registration (Mall Onboarding)
**Endpoint**: `POST http://localhost:9090/api/register/mall-admin`  
**Description**: Creates a new User (Mall Admin) and a new Mall.

**JSON Body**:
```json
{
    "username": "malladmin01",
    "password": "password123",
    "adminName": "John Doe",
    "email": "johndoe@example.com",
    "mallName": "Grand Plaza Mall",
    "mallLocation": "New York, NY",
    "mallContact": "123-456-7890"
}
```

---

## 🚀 Step 2: Shop Owner Registration (Shop Onboarding)
**Endpoint**: `POST http://localhost:9090/api/register/shop-owner`  
**Description**: Creates a new User (Shop Owner) and links them to a new Shop in the Mall created above.

**JSON Body**:
> **Note**: Replace `mallId` with the actual ID returned from Step 1 (e.g., `1`).

```json
{
    "username": "shopowner01",
    "password": "password123",
    "ownerName": "Jane Smith",
    "contactNumber": "987-654-3210",
    "shopName": "Tech Gadgets Store",
    "shopType": "Electronics",
    "mallId": 1
}
```

---

## 🚀 Step 3: Add Inventory (Create Items)
**Endpoint**: `POST http://localhost:9090/api/items/shop/{shopId}`  
**Example**: `POST http://localhost:9090/api/items/shop/1`  
**Description**: Adds a new item to the specific shop.

**JSON Body**:
```json
{
    "itemName": "Smartphone X",
    "price": 999.99,
    "quantity": 50
}
```

---

## 🚀 Step 4: Customer Registration
**Endpoint**: `POST http://localhost:9090/api/customers`  
**Description**: Registers a new customer who can place orders.

**JSON Body**:
```json
{
    "customerName": "Alice Wonderland",
    "email": "alice@example.com",
    "phoneNumber": "555-0199"
}
```

---

## 🚀 Step 5: Place an Order
**Endpoint**: `POST http://localhost:9090/api/orders`  
**Description**: Creates a new order linking a Customer and a Shop.

**JSON Body**:
> **Note**: Verify `customerId` and `shopId` match existing records.

```json
{
    "orderStatus": "PENDING",
    "paymentMode": "CREDIT_CARD",
    "totalAmount": 999.99,
    "customer": {
        "customerId": 1
    },
    "shop": {
        "shopId": 1
    }
}
```
*Note: The current system design links orders to shops and customers. Specific item deduction logic may be handled separately or requires future implementation.*

---

## 🔍 Verification
-   **Get All Malls**: `GET http://localhost:9090/api/malls`
-   **Get All Shops**: `GET http://localhost:9090/api/shops`
-   **Get All Orders**: `GET http://localhost:9090/api/orders`

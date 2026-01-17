# Mall Project Frontend

A React-based frontend for the Mall Project management system.

## Features

- 🏬 **Mall Management** - Create, view, and manage malls
- 🏪 **Shop Management** - Manage shops within malls
- 👥 **Customer Management** - Track and manage customers
- 📊 **Dashboard** - Quick overview of the system

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup & Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

This will create an optimized production build and automatically copy it to the Spring Boot static folder.

## Backend Integration

The frontend connects to the Spring Boot backend running on `http://localhost:8080`.

Make sure the backend is running before starting the frontend:

```bash
cd ..
./mvnw spring-boot:run
```

## API Endpoints Used

- **Malls**: `GET /api/malls`, `POST /api/malls`, `DELETE /api/malls/{id}`
- **Shops**: `GET /api/shops`, `POST /api/shops`, `DELETE /api/shops/{id}`
- **Customers**: `GET /customers`, `POST /customers`, `DELETE /customers/{id}`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── MallList.js
│   │   ├── ShopList.js
│   │   └── CustomerList.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects the app (irreversible)

## Technologies Used

- React 18
- Axios for API calls
- CSS3 for styling

## Troubleshooting

**"Cannot connect to backend"**
- Ensure Spring Boot backend is running on port 8080
- Check CORS configuration in Spring Boot

**"Axios errors"**
- Verify the API endpoints match your backend routes
- Check network tab in browser DevTools

## License

MIT

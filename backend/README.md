# Expense Tracker - Backend API

The backend API for the Expense Tracker application, built with Node.js, Express.js, and MongoDB.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Testing**: Jest with Supertest
- **Development**: Nodemon for auto-restart

## 📁 Project Structure

```
backend/
├── controllers/           # Route controllers
│   ├── authController.js
│   ├── categoryController.js
│   ├── expenseController.js
│   └── incomeController.js
├── middleware/           # Custom middleware
│   └── authMiddleware.js
├── models/              # MongoDB models
│   ├── categoryModel.js
│   ├── expenseModel.js
│   ├── incomeModel.js
│   └── userModel.js
├── routes/              # API routes
│   └── routes.js
├── tests/               # Test files
│   ├── api/
│   ├── models/
│   └── scripts/
├── utils/               # Utility functions
│   ├── config.js
│   └── db.js
├── app.js              # Express app setup
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the backend root:
   ```env
   NODE_ENV=development
   PORT=3001
   MONGO_CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_TEST_SECRET=your_test_jwt_secret
   ```

4. **Start the server**
   ```bash
   npm start          # Development with nodemon
   ```

The server will start on `http://localhost:3001`

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run test:ci       # Run tests for CI environment
```

### Custom Test Runner

The project includes a custom test runner script (`tests/scripts/testRunner.js`) that provides a comprehensive testing workflow:

```bash
node tests/scripts/testRunner.js
```

This script:
- Runs model tests
- Executes API endpoint tests  
- Performs integration testing
- Generates detailed coverage reports
- Provides colored console output for easy result interpretation

### Test Coverage

The test suite covers:
- API endpoints (authentication, expenses, categories)
- Database models and validations
- Middleware functionality
- Error handling

Coverage reports are generated in HTML format and saved to the `coverage/` directory.

## 📚 API Documentation

Base URL: `http://localhost:3001/api/v1`

### Authentication Required

All endpoints except `/auth/register` and `/auth/login` require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Common Error Responses

- `401 Unauthorized`: "User not found" or "Authorization failed"
- `500 Internal Server Error`: Server-side errors with error message

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

**Error Responses:**
- `400`: "All fields required"
- `400`: "Password must be at least 8 characters"
- `400`: "Email has already been registered"
- `400`: "Invalid user data"

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

**Error Responses:**
- `400`: "Email and password are required"
- `404`: "Account with this email does not exist"
- `401`: "Invalid email or password"

### Get User Profile
**GET** `/auth/profile`

**Success Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 💰 Expense Endpoints

### Create Expense
**POST** `/expenses`

**Request Body Options:**

*With existing category name:*
```json
{
  "title": "Grocery Shopping",
  "amount": 75.50,
  "category": "Food",
  "description": "Weekly groceries",
  "date": "2024-01-15T00:00:00.000Z"
}
```

*With existing category ID:*
```json
{
  "title": "Gas Station",
  "amount": 40.00,
  "category": "category_object_id",
  "description": "Fuel for car",
  "date": "2024-01-15T00:00:00.000Z"
}
```

*With new category name (creates category):*
```json
{
  "title": "Netflix Subscription",
  "amount": 15.99,
  "category": "Entertainment",
  "description": "Monthly subscription",
  "date": "2024-01-15T00:00:00.000Z"
}
```

**Success Response (200):**
```json
{
  "_id": "expense_id",
  "user": "user_id",
  "title": "Grocery Shopping",
  "amount": 75.50,
  "category": {
    "_id": "category_id",
    "name": "Food"
  },
  "description": "Weekly groceries",
  "date": "2024-01-15T00:00:00.000Z"
}
```

**Error Responses:**
- `400`: Field validation errors (title, amount, date, category, description required)
- `400`: "Amount must be a positive number"
- `400`: "Category must be a non-empty string"
- `400`: "Invalid category. Category must exist and belong to the user"

### Get All Expenses
**GET** `/expenses`

**Success Response (200):**
```json
[
  {
    "_id": "expense_id",
    "user": "user_id",
    "title": "Grocery Shopping",
    "amount": 75.50,
    "category": {
      "_id": "category_id",
      "name": "Food"
    },
    "description": "Weekly groceries",
    "date": "2024-01-15T00:00:00.000Z"
  }
]
```

### Delete Expense
**DELETE** `/expenses/:id`

**Success Response (200):**
Returns the deleted expense object

**Error Responses:**
- `403`: "Not authorized"
- `404`: "Expense not found"

---

## 📂 Category Endpoints

### Create Category
**POST** `/categories`

**Request Body Options:**

*With yearly budget:*
```json
{
  "name": "Travel",
  "budget_per_year": 3000
}
```

*With monthly budget:*
```json
{
  "name": "Food",
  "budget_per_month": 500
}
```

*With weekly budget:*
```json
{
  "name": "Entertainment",
  "budget_per_week": 100
}
```

**Success Response (200):**
```json
{
  "_id": "category_id",
  "user": "user_id",
  "name": "Travel",
  "budget_per_year": 3000,
  "budget_per_month": 250,
  "budget_per_week": 57.69
}
```

**Error Responses:**
- `400`: "Name required"
- `400`: "One positive budget field required"
- `400`: "Category name already exists. Please use a different name"

### Get All Categories
**GET** `/categories`

**Success Response (200):**
```json
[
  {
    "_id": "category_id",
    "user": "user_id",
    "name": "Travel",
    "budget_per_year": 3000,
    "budget_per_month": 250,
    "budget_per_week": 57.69
  }
]
```

### Delete Category
**DELETE** `/categories/:id`

**Success Response (200):**
Returns the deleted category object

**Error Responses:**
- `400`: "Cannot delete category. It is being used by one or more expenses"
- `403`: "Not authorized"
- `404`: "Category not found"

---

## 🔧 Configuration

The application uses environment-based configuration. See the `.env.example` file for required variables.

## 🐛 Error Handling

The API implements comprehensive error handling with appropriate HTTP status codes and descriptive error messages. All errors are logged for debugging purposes.

## 🔒 Security Features

- **Password hashing with bcryptjs**: User passwords are securely hashed before storage
- **JWT token authentication**: Stateless authentication with token-based sessions
- **User-specific data isolation**: Database queries ensure users can only access their own data
- **Input validation**: Request body validation for all endpoints
- **CORS configuration**: Cross-origin resource sharing properly configured

## 🚧 Current Development Status

This API is functional but actively being developed. Current limitations and planned improvements:

### In Progress
- **Update endpoints**: PUT/PATCH operations for expenses and categories
- **Enhanced error handling**: More granular error responses and logging
- **API documentation**: OpenAPI/Swagger documentation generation

### Implemented Features
- Complete CRUD operations for expenses (except UPDATE)
- Complete CRUD operations for categories (except UPDATE)
- Robust authentication system
- Comprehensive test suite with custom test runner
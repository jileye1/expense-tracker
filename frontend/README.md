# Expense Tracker - Frontend

A modern React application for tracking expenses, managing budgets, and visualizing spending patterns.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Styling**: Styled Components
- **HTTP Client**: Axios

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── api/                  # API service functions
│   │   ├── auth.js
│   │   ├── categories.js
│   │   ├── expenses.js
│   │   └── incomes.js
│   ├── components/          
│   │   ├── categoryBudgets/
│   │   ├── chart/
│   │   ├── expenses/
│   │   ├── navigation/
│   │   └── ui/               # Reusable UI components
│   │       ├── Button/
│   │       ├── Form/
│   │       └── Modal/
│   ├── contexts/             # React contexts
│   │   ├── AuthContext.js
│   │   └── globalContext.js
│   ├── img/                  # Images and icons
│   ├── pages/               # Page components
│   │   └── login/
│   ├── styles/              # Global styles
│   │   ├── GlobalStyle.js
│   │   └── Layouts.js
│   ├── utils/               # Utility functions
│   │   ├── dateFormat.js
│   │   ├── filterUtils.js
│   │   ├── icons.js
│   │   └── menuItems.js
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   └── setupTests.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running backend API server

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the frontend root:
   ```env
   REACT_APP_SERVER_URL=http://localhost:3001/api/v1
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## 📜 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner in interactive watch mode
- `npm run eject` - **Note: This is a one-way operation!**

## 🔧 Key Features & Components

### Authentication
- **AuthContext**: Manages user authentication state across the app
- **Login Page**: Secure login and registration forms
- **Protected Routes**: Automatic redirection for unauthenticated users

### Expense Management
- Main expense management dashboard
- Modal for adding/editing expenses with category selection
- Advanced filtering by date or text search

### Category Management
- Create, edit, and delete spending categories
- Set flexible budgets (yearly, monthly, or weekly)
- Category-based expense organization

## 🎨 Styling

The application uses **Styled Components** for styling with the following approach:

- **GlobalStyle.js**: Global CSS reset and base styles
- **Layouts.js**: Common layout patterns and containers  
- Component-specific styles co-located with components
- Consistent color palette and typography
- Responsive design with mobile-first approach

## 📊 Data Flow & State Management

### Context Providers
- **GlobalContext**: Manages expenses, categories, and global app state
- **AuthContext**: Handles authentication, user data, and tokens

### API Integration
- Centralized API services in `/src/api/`
- Axios interceptors for authentication headers
- Error handling

## 🔌 API Integration

### Authentication Flow
1. User login/register → Receive JWT token
2. Store token in AuthContext
3. Include token in all API requests via Axios interceptors
4. Automatic logout on token expiration

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Collapsible navigation menu

## 🚧 Current Development Status

This frontend application is functional but actively being developed as part of a software engineering portfolio. While core features work well, several areas are being refined:

### In Progress
- **Dashboard Implementation**: Building comprehensive spending analytics and overview page
- **UI/UX Improvements**: Ongoing design refinements and visual polish
- **Architecture Refactoring**: 
  - Reorganizing folder structure (better separation of components vs pages)
  - Migrating to reusable UI components (forms, modals, buttons)
  - Consolidating duplicate styling across components
- **Mobile Responsiveness**: Improving layout and usability on smaller screens
- **Error Handling**: Replacing basic alert() popups with custom, user-friendly error components

### Implemented Features
- Complete expense management (add, view, delete, filter)
- Category management with budget tracking
- User authentication and protected routes
- Basic responsive design

## 🎯 Planned Enhancements

- Dashboard with spending analytics
- Budget progress indicators
- Data export functionality
- Dark mode theme
- Offline functionality with service workers

## 🔧 Configuration

### Environment Variables
- `REACT_APP_SERVER_URL`: Backend API base URL

### Browser Compatibility
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
- Clear `node_modules` and `package-lock.json`, then reinstall
- Check Node.js version compatibility

**API Connection Issues:**
- Verify backend server is running
- Check `REACT_APP_SERVER_URL` environment variable
- Verify CORS configuration on backend

**Authentication Issues:**
- Clear browser localStorage
- Check JWT token expiration
- Verify API authentication headers

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Styled Components Documentation](https://styled-components.com/docs)
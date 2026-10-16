# AuthFlow — Secure Authentication System

AuthFlow is a full-stack authentication application built using the MERN stack. It demonstrates secure user authentication, protected routes, user profile management, input validation, and centralized error handling.

## Features

### Authentication
- User registration with input validation
- Duplicate email and invalid input handling
- Secure password hashing using bcrypt
- Login with credential validation
- JWT-based authentication using HTTP-only cookies
- Logout and session clearing
- Protected Dashboard and Profile routes
- Current authenticated user retrieval

### User Experience
- Signup success notifications
- Login success and error feedback
- Loading states and API error handling
- Authentication-aware navigation
- Responsive React interface

### Backend Security
- Request validation
- Centralized error handling
- Authentication middleware for protected endpoints
- Environment-based configuration
- CORS and cookie configuration

## Tech Stack

### Frontend
- React
- JavaScript
- HTML and CSS
- Vite
- React Router
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

### Development and Testing Tools
- Git and GitHub
- Postman
- Jest and Supertest

## Project Structure

```text
AuthFlow/
├── client/
│   ├── src/
│   ├── package.json
│   └── README.md
├── server/
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── README.md
│   ├── REQUIREMENTS.md
│   ├── SETUP_GUIDE.md
│   └── TESTING_GUIDE.md
└── .gitignore
```

## Getting Started

Refer to [SETUP_GUIDE.md](./SETUP_GUIDE.md) for installation, environment configuration, and instructions for running the application locally.

## Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Architecture](./ARCHITECTURE.md)
- [Requirements](./REQUIREMENTS.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Testing Guide](./TESTING_GUIDE.md)

## Security Notes

- Passwords are stored as hashes rather than plain text.
- Sensitive credentials are configured through environment variables.
- Protected endpoints use authentication middleware.
- JWT authentication uses HTTP-only cookies.
- CORS and cookie settings are configured for the application environment.

Keep production secrets private. Configure strong secrets and production-specific cookie and CORS settings before deployment.

## Project Status

**Core authentication flow implemented.**

Registration, login, logout, protected routes, authentication feedback, and the main user flows have been tested. Refer to the testing guide for the documented test coverage.

## Author

Adarsh Verma

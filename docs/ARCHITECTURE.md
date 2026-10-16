# AuthFlow — System Architecture

## 1. Architecture Overview

AuthFlow follows a client-server architecture.

- Client: React application.
- Server: Node.js and Express REST API.
- Database: MongoDB accessed through Mongoose.
- Authentication: JWT delivered through an HTTP-only cookie.

## 2. High-Level Architecture

```text
+---------------------------+
|      React Client         |
|                           |
| Register / Login          |
| Dashboard / User Profile  |
+-------------+-------------+
              |
              | HTTP Requests
              | Cookie credentials
              v
+---------------------------+
|     Express REST API      |
|                           |
| Routes                    |
| Authentication Middleware |
| Controllers               |
| Validation                |
+-------------+-------------+
              |
              | Mongoose
              v
+---------------------------+
|         MongoDB           |
|                           |
| User Records               |
| Hashed Passwords           |
+---------------------------+
```

## 3. Registration Flow

1. User submits name, email, and password.
2. React sends a registration request to the backend.
3. Express validates the request.
4. The backend checks whether the email is already registered.
5. bcrypt hashes the password.
6. Mongoose saves the user in MongoDB.
7. The API returns an appropriate response without exposing the password hash.

## 4. Login Flow

1. User submits email and password.
2. The backend validates the input.
3. The backend retrieves the matching user.
4. bcrypt compares the submitted password with the stored hash.
5. If credentials are valid, the backend signs a JWT.
6. The JWT is delivered through an HTTP-only cookie.
7. The frontend can access the authenticated application.

Invalid credentials must not produce an authenticated session.

## 5. Protected Request Flow

1. The client sends a request to a protected endpoint.
2. The browser includes the authentication cookie when cookie and request settings permit it.
3. Authentication middleware verifies the JWT signature and expiry.
4. The middleware identifies the authenticated user.
5. The request proceeds to the controller only if authentication succeeds.
6. The API returns the requested data or an appropriate error.

## 6. Logout Flow

1. The user clicks Logout.
2. The frontend sends a logout request.
3. The backend clears the authentication cookie using matching cookie settings.
4. The frontend clears its local authentication state and navigates to the login page.

Clearing the cookie removes the browser's stored token. A copied JWT may remain valid until expiry unless additional server-side revocation is implemented.

## 7. Backend Responsibilities

- Routes: Define API endpoints.
- Controllers: Handle request and response logic.
- Models: Define MongoDB document structure.
- Middleware: Verify authentication and handle shared request processing.
- Validators: Validate request input.
- Config: Manage database and application configuration.
- Utils: Store reusable helper functions.
- Tests: Verify authentication behavior and error cases.

## 8. Frontend Responsibilities

- Pages: Registration, login, dashboard, and profile.
- Components: Reusable UI elements.
- Services: Communicate with backend APIs.
- Context: Share authentication state where appropriate.
- Protected route logic: Prevent unauthenticated users from viewing private pages.

Frontend route protection is for user experience. Backend middleware remains the actual security boundary.

## 9. Security Principles

- Store password hashes, never plain-text passwords.
- Keep JWT secrets and database credentials in environment variables.
- Configure CORS for trusted origins.
- Use appropriate cookie settings, including HttpOnly, Secure in production, and SameSite.
- Validate and authorize every sensitive request.
- Avoid logging passwords, tokens, or other secrets.
- Consider CSRF protections when using cookie-based authentication.

## 10. Planned Request Lifecycle

Client → Express Route → Validation → Authentication Middleware (when required) → Controller → Mongoose → MongoDB → API Response → Client

Exact middleware order will depend on the endpoint.

## 11. Deployment Architecture

The React frontend, Express API, and MongoDB database can be hosted separately.

Environment variables configure the API URL, database connection, JWT secret, and production cookie behaviour. Production CORS settings must allow the deployed frontend origin, and credential settings must be compatible with the authentication cookie configuration.

Before deployment, verify HTTPS, production environment variables, database access restrictions, cookie behaviour, and error handling in the target hosting environment.
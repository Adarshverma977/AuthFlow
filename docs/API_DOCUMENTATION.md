# AuthFlow — API Documentation

## 1. Base URL

Development:

`http://localhost:5000/api`

## 2. Authentication APIs

### 2.1 Register User

- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Authentication:** Not required

Request body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "ExamplePass123!"
}
```

Expected behaviour:

- Validate registration input.
- Reject duplicate email addresses.
- Hash the password before storing the user.
- Return a successful registration response without exposing the password hash.
- Registration does not automatically log the user in; the user must log in separately.

Success status: `201 Created`.

### 2.2 Login User

- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Authentication:** Not required

Request body:

```json
{
  "email": "test@example.com",
  "password": "ExamplePass123!"
}
```

Expected behaviour:

- Validate the submitted credentials.
- Set the authentication JWT in an HTTP-only cookie on successful login.
- Return the authenticated user's safe profile data.
- Reject incorrect credentials.

The cookie is configured with `HttpOnly`, `SameSite=Lax`, a root path, and a 24-hour maximum age. The `Secure` flag is enabled when `NODE_ENV=production`.

### 2.3 Logout User

- **Method:** `POST`
- **Endpoint:** `/auth/logout`
- **Authentication:** Required

Expected behaviour:

- Clear the authentication cookie.
- Clear the frontend authentication state.
- Return an appropriate response after logout.

### 2.4 Get Current User

- **Method:** `GET`
- **Endpoint:** `/auth/me`
- **Authentication:** Required

Expected behaviour:

- Read the authentication token from the cookie.
- Verify the token through the authentication middleware.
- Return the current user's safe profile data.
- Reject unauthenticated requests.

## 3. User APIs

### 3.1 Get Profile

- **Method:** `GET`
- **Endpoint:** `/users/profile`
- **Authentication:** Required

Expected behaviour:

- Return the authenticated user's profile.
- Restrict access to the authenticated user's own profile.

### 3.2 Update Profile

- **Method:** `PATCH`
- **Endpoint:** `/users/profile`
- **Authentication:** Required

Example request body:

```json
{
  "name": "Updated User"
}
```

Expected behaviour:

- Validate permitted update fields.
- Update the authenticated user's profile.
- Do not allow users to modify another user's profile.

Confirm the exact allowed fields against the profile validation schema before extending this example.

## 4. Health Check

- **Method:** `GET`
- **Endpoint:** `/health`
- **Authentication:** Not required

Used to check whether the API server is responding.

## 5. Common HTTP Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | User registration succeeded |
| `400 Bad Request` | Invalid request input, where returned by the API |
| `401 Unauthorized` | Authentication failed or is required |
| `403 Forbidden` | Access denied, where applicable |
| `409 Conflict` | Duplicate resource, if implemented with this status |
| `500 Internal Server Error` | Unexpected server error |

The exact status returned for each error depends on the backend controller, validation middleware, and centralized error handler.

## 6. Authentication and Cookie Configuration

- Authentication uses a JWT stored in an HTTP-only cookie.
- The frontend must send credentials with API requests that depend on the cookie.
- The backend enables credentialed CORS for the configured frontend origin.
- The cookie uses `SameSite=Lax`.
- The `Secure` flag is enabled in production.
- JWT signing uses the secret configured through the backend environment variables.

For production deployment, configure trusted frontend origins, strong private secrets, HTTPS, and compatible cookie settings for the deployed frontend and backend.

## 7. Testing Checklist

- Register with valid details.
- Reject duplicate email addresses.
- Reject invalid registration input.
- Login with correct credentials.
- Reject incorrect credentials.
- Confirm signup redirects to login without authenticating the user.
- Access protected endpoints with and without a valid cookie.
- Confirm logout clears the session.
- Retrieve the current authenticated user.
- Retrieve and update the authenticated user's profile.
- Verify unauthorized access is rejected.

Document test cases as passed only when they have actually been executed.

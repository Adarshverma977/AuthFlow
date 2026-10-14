# AuthFlow — API Documentation

## 1. Base URL

Development:

`http://localhost:5000/api`

## 2. Authentication APIs

### 2.1 Register User

- Method: POST
- Endpoint: `/auth/register`
- Authentication: Not required

Request body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "ExamplePass123!"
}
```

Expected behavior:
- Validate all required fields.
- Reject an already registered email.
- Hash the password before saving.
- Return a success response without exposing the password or password hash.

### 2.2 Login User

- Method: POST
- Endpoint: `/auth/login`
- Authentication: Not required

Request body:

```json
{
  "email": "test@example.com",
  "password": "ExamplePass123!"
}
```

Expected behavior:
- Verify the credentials.
- Set an HTTP-only authentication cookie on success.
- Return the authenticated user's safe profile data.
- Reject invalid credentials.

### 2.3 Logout User

- Method: POST
- Endpoint: `/auth/logout`
- Authentication: Authenticated session required

Expected behavior:
- Clear the authentication cookie using matching cookie settings.
- Clear the frontend's local authentication state.

### 2.4 Get Current User

- Method: GET
- Endpoint: `/auth/me`
- Authentication: Required

Expected behavior:
- Verify the JWT.
- Return the currently authenticated user's safe profile data.
- Reject requests with missing, invalid, or expired tokens.

## 3. User APIs

### 3.1 Get Profile

- Method: GET
- Endpoint: `/users/profile`
- Authentication: Required

Expected behavior:
- Return the authenticated user's profile.
- Never allow access to another user's private profile through user-controlled identifiers.

### 3.2 Update Profile

- Method: PATCH
- Endpoint: `/users/profile`
- Authentication: Required

Request body:

```json
{
  "name": "Updated User"
}
```

Expected behavior:
- Validate permitted fields.
- Update only the authenticated user's profile.
- Reject unexpected or unauthorized fields.

## 4. Common HTTP Status Codes

- `200 OK`: Request successful.
- `201 Created`: User successfully registered.
- `400 Bad Request`: Invalid input.
- `401 Unauthorized`: Missing or invalid authentication, or invalid credentials.
- `403 Forbidden`: Authenticated user lacks required permission.
- `409 Conflict`: Duplicate email registration.
- `500 Internal Server Error`: Unexpected server failure.

Exact status codes will be standardized during implementation.

## 5. Error Response Format

Planned format:

```json
{
  "success": false,
  "message": "A descriptive error message"
}
```

Successful responses will use a consistent format as well.

## 6. Cookie and CORS Requirements

- The authentication cookie will use `HttpOnly`.
- `Secure` will be enabled in production.
- `SameSite` will be configured according to the deployment topology.
- The frontend will send credentials where required.
- The backend will allow only trusted frontend origins when credentials are enabled.

## 7. Testing Checklist

- Register with valid data.
- Reject duplicate email addresses.
- Reject invalid registration data.
- Login with valid credentials.
- Reject incorrect credentials.
- Access protected endpoints without a cookie.
- Access protected endpoints with an invalid or expired token.
- Logout and verify the browser cookie is cleared.
- Retrieve and update the authenticated user's profile.
- Verify one user cannot access another user's private data.
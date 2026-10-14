# AuthFlow — Testing Guide

## 1. Testing Objectives

Testing will verify that registration, login, logout, authentication, and profile management behave correctly.

The project will use:
- Postman for manual API testing.
- Jest for automated tests.
- Supertest for testing Express endpoints.

## 2. Registration Tests

| Test Case | Expected Result |
|---|---|
| Register with valid details | User created successfully |
| Register with an existing email | Request rejected |
| Submit an invalid email | Validation error |
| Submit a missing required field | Validation error |
| Submit an invalid password | Validation error |
| Register with valid details twice | Second registration rejected |

## 3. Login Tests

| Test Case | Expected Result |
|---|---|
| Login with correct credentials | Authentication succeeds |
| Login with incorrect password | Authentication rejected |
| Login with an unregistered email | Authentication rejected |
| Submit missing credentials | Validation error |
| Successful login | Authentication cookie is set correctly |

## 4. Protected Route Tests

| Test Case | Expected Result |
|---|---|
| Request protected endpoint without a cookie | Request rejected |
| Send an invalid JWT | Request rejected |
| Send an expired JWT | Request rejected |
| Send a valid JWT | Request accepted |
| Access another user's private data | Access denied |

## 5. Logout Tests

- Logout clears the authentication cookie.
- The frontend clears its local authentication state.
- Subsequent requests without valid authentication are rejected.
- If server-side token revocation is not implemented, a copied token may remain valid until expiry.

## 6. Profile Tests

- Retrieve the authenticated user's profile.
- Update an allowed field such as name.
- Reject invalid profile data.
- Reject attempts to modify restricted fields.
- Verify users cannot read or update another user's private data.

## 7. Security Tests

- Confirm passwords are stored as hashes.
- Confirm API responses never expose password hashes.
- Confirm secrets are not committed to Git.
- Verify CORS permits only configured frontend origins.
- Verify production cookies use secure settings.
- Verify malformed requests receive appropriate error responses.

## 8. Automated Testing Structure

Planned backend test organization:

```text
server/
└── tests/
    ├── auth.test.js
    ├── users.test.js
    └── setup.js
```

Test files may be adjusted as the application architecture develops.

## 9. Completion Criteria

The initial authentication system is ready for release when:

- Core authentication flows pass their tests.
- Protected endpoints enforce authentication.
- Profile operations enforce authorization.
- Error responses are consistent.
- No secrets or plain-text passwords are exposed.
- Manual and automated testing instructions are documented.

## 10. Test Execution

Exact test commands will be added after Jest, Supertest, and the backend test scripts have been configured.
# AuthFlow — Testing Guide

## 1. Testing Objectives

This guide documents the testing scenarios for AuthFlow's registration, login, logout, protected routes, and profile management.

Testing tools:
- **Postman:** Manual API testing.
- **Jest:** Automated JavaScript testing, if configured.
- **Supertest:** Express endpoint testing, if configured.

## 2. Registration Tests

| Test Case | Expected Result |
|---|---|
| Register with valid details | User created successfully |
| Register with an existing email | Request rejected |
| Submit an invalid email | Validation error |
| Submit a missing required field | Validation error |
| Submit invalid registration data | Request rejected |
| Register with valid details twice | Second registration rejected |
| Register successfully | User redirected to Login without automatic authentication |

## 3. Login Tests

| Test Case | Expected Result |
|---|---|
| Login with correct credentials | Authentication succeeds |
| Login with an incorrect password | Authentication rejected |
| Login with an unregistered email | Authentication rejected |
| Submit missing credentials | Request rejected |
| Successful login | Authentication cookie is set |
| Login with invalid credentials | Error feedback is displayed |

## 4. Protected Route Tests

| Test Case | Expected Result |
|---|---|
| Request a protected endpoint without a cookie | Request rejected |
| Send an invalid JWT | Request rejected |
| Send an expired JWT | Request rejected |
| Send a valid JWT | Request accepted |
| Open a protected frontend route while logged out | User is redirected or access is blocked |
| Access another user's private data | Access denied |

## 5. Logout Tests

- Confirm the logout endpoint clears the authentication cookie.
- Confirm the frontend clears its local authentication state.
- Confirm protected endpoints reject requests without valid authentication.
- If server-side token revocation is not implemented, a copied token may remain valid until expiry.

## 6. Profile Tests

- Retrieve the authenticated user's profile.
- Update an allowed field, such as name.
- Submit invalid profile data.
- Attempt to modify restricted fields.
- Verify users cannot read or update another user's private data.

Confirm the exact allowed fields and validation rules against the implementation.

## 7. Security Tests

- Confirm passwords are stored as hashes.
- Confirm API responses do not expose password hashes.
- Confirm secrets are excluded from Git.
- Verify CORS allows only the configured frontend origin.
- Verify production cookies use appropriate secure settings.
- Verify invalid requests return appropriate error responses.

## 8. Automated Testing

The following is a suggested test organization, not a claim that these files already exist:

```text
server/
└── tests/
    ├── auth.test.js
    ├── users.test.js
    └── setup.js
```

Adjust the structure to match the actual test files and project configuration.

## 9. Completion Criteria

The core authentication flow can be considered functionally verified when:

- Registration and login scenarios pass.
- Signup redirects to Login without automatically authenticating the user.
- Protected routes enforce authentication.
- Logout clears the browser cookie and frontend authentication state.
- Profile operations enforce appropriate authorization.
- Error handling works for invalid requests.
- The frontend production build succeeds.
- Setup, API, architecture, and testing documentation are maintained.

Automated test coverage and production deployment must be verified separately before claiming those milestones are complete.

## 10. Test Execution

### Frontend production build

Run from the `client/` directory:

```bash
npm run build
```

### Backend automated tests

Run from the `server/` directory only if the corresponding test script is configured:

```bash
npm test
```

Check `server/package.json` for the actual test command and available scripts before execution.

### Manual API testing

Use Postman to test the endpoints documented in `API_DOCUMENTATION.md`. Verify response status, response body, authentication cookies, and access control.

Record a test as passed only after executing it and observing the expected result.

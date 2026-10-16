# AuthFlow — Setup Guide

## 1. Prerequisites

Install the following tools before starting:

- Node.js (LTS version)
- npm
- Git
- Visual Studio Code or another code editor
- MongoDB local installation or a MongoDB Atlas database
- Postman for API testing

Verify Node.js and npm:

```bash
node -v
npm -v
```

## 2. Project Structure

```text
AuthFlow/
├── client/
├── server/
├── docs/
├── .gitignore
└── README.md
```

The frontend, backend, and project documentation are maintained separately.

## 3. Environment Configuration

Create the backend environment file at `server/.env` and configure the variables required by the application.

Example development configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Use the variable names expected by the backend configuration. Replace placeholders with your own values.

**Security:**
- Never commit real environment secrets to Git.
- Use a strong, unique JWT secret.
- Do not expose backend secrets in frontend environment variables.
- Keep production credentials separate from development credentials.

## 4. Backend Setup

Open a terminal in the project root and navigate to the backend:

```bash
cd server
npm install
```

Configure `server/.env` before starting the server.

Start the backend using the script defined in `server/package.json`. For example, if the project provides a `dev` script:

```bash
npm run dev
```

The expected development API address is:

`http://localhost:5000`

Health check:

`GET http://localhost:5000/api/health`

## 5. Frontend Setup

Open a second terminal from the project root:

```bash
cd client
npm install
```

Configure the frontend API base URL using the environment variable expected by the client code, if required.

Start the Vite development server using the script defined in `client/package.json`:

```bash
npm run dev
```

The default development URL is:

`http://localhost:5173`

## 6. Database Setup

Configure either a local MongoDB instance or a MongoDB Atlas database.

- Ensure the database is running or reachable.
- Set `MONGODB_URI` in `server/.env`.
- For Atlas, configure appropriate database credentials and network access.
- Never commit database credentials to version control.

## 7. Authentication Configuration

AuthFlow uses JWT-based authentication through an HTTP-only cookie.

During development:

- Configure `CLIENT_URL` to match the frontend origin.
- Ensure the frontend sends credentials with requests that require cookie-based authentication.
- Ensure the backend enables credentialed CORS for the configured origin.
- Verify that cookie settings are compatible with the local development environment.

The authentication cookie uses `SameSite=Lax` and a root path. Its `Secure` flag is enabled when `NODE_ENV=production`.

## 8. Running the Application

Run the backend and frontend in separate terminals.

1. Start MongoDB or confirm the Atlas database is accessible.
2. Start the backend from `server/`.
3. Start the frontend from `client/`.
4. Open the frontend development URL in your browser.
5. Test registration, login, protected routes, profile access, and logout.

Use the scripts listed in each package's `package.json` if their names differ from the examples above.

## 9. Troubleshooting

### Backend cannot connect to MongoDB
- Check `MONGODB_URI`.
- Confirm the database is running or reachable.
- Verify Atlas network access and credentials if using Atlas.

### Frontend API requests fail
- Confirm the backend is running.
- Verify the frontend API base URL.
- Check the `CLIENT_URL` value and CORS configuration.
- Inspect the browser console and network requests.

### Authentication cookie is missing
- Confirm the login request succeeds.
- Verify the backend sets the cookie.
- Confirm frontend requests include credentials where required.
- Check browser cookie settings and the browser's developer tools.

### Environment configuration is not applied
- Confirm the environment file is in the correct directory.
- Verify the variable names against the code.
- Restart the relevant development server after changing environment variables.

## 10. Security Notes

- Keep `.env` files out of version control.
- Never expose the JWT secret in frontend code.
- Use HTTPS and appropriate secure cookie settings in production.
- Do not store passwords in plain text.
- Restrict production CORS to trusted frontend origins.
- Never share private keys, JWT secrets, or database credentials.

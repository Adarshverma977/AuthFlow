# AuthFlow — Setup Guide

## 1. Prerequisites

Install the following tools before starting:

- Node.js (LTS version)
- npm
- Git
- Visual Studio Code
- MongoDB local installation or a MongoDB Atlas database
- Postman for API testing

Verify Node.js and npm:

```bash
node -v
npm -v
```

## 2. Project Structure

The project uses separate directories for the frontend, backend, and documentation.

```text
AuthFlow/
├── client/
├── server/
├── docs/
├── .gitignore
└── README.md
```

## 3. Environment Configuration

The backend will use a `.env` file for sensitive configuration.

Planned variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Replace placeholder values with your own configuration. Never commit real secrets to Git.

## 4. Backend Setup

Backend installation and start commands will be documented after the Express server is initialized.

The backend is expected to run at:

`http://localhost:5000`

## 5. Frontend Setup

The React frontend will be configured using Vite.

Development URL:

`http://localhost:5173`

## 6. Database Setup

Configure either a local MongoDB instance or a MongoDB Atlas database.

The backend will connect using the `MONGODB_URI` environment variable.

## 7. Authentication Configuration

The frontend and backend will be configured for cookie-based authentication.

During development:
- Allow the trusted local frontend origin.
- Configure credentialed requests where required.
- Configure cookie settings consistently.

Production configuration will be documented after deployment.

## 8. Running the Application

The frontend and backend will run in separate terminals during development.

Exact commands will be added once their `package.json` files and entry points are created.

## 9. Troubleshooting

### Backend cannot connect to MongoDB
- Check the connection string.
- Confirm the database is running or reachable.
- Verify Atlas network access if using Atlas.

### Frontend API requests fail
- Confirm the backend is running.
- Verify the API base URL.
- Check CORS and credential settings.

### Authentication cookie is missing
- Check browser cookie settings.
- Verify the frontend request includes credentials.
- Verify the backend sets the cookie correctly.

## 10. Security Notes

- Keep `.env` out of version control.
- Never expose the JWT secret in frontend code.
- Use HTTPS and secure cookies in production.
- Do not store passwords in plain text.
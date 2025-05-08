# Advanced Authentication with MERN Stack

This project is an advanced authentication system built using the MERN (MongoDB, Express, React, Node.js) stack. It includes features like email verification, secure password hashing, and token-based authentication.

## Project Structure

The project is organized as follows:

- **Root**: Contains the main `package.json` file and links to both the backend and frontend folders.
- **backend**: Contains the server-side code, including API endpoints, database models, and authentication logic.
- **frontend**: Contains the client-side code, built with React, for user interaction and UI.

## Features

- User registration and login
- Email verification using Mailtrap
- Secure password hashing with bcrypt
- Token-based authentication with JSON Web Tokens (JWT)
- Protected routes for authenticated users
- Responsive and user-friendly UI

## Technologies Used

- **Frontend**: React, Axios, Bootstrap/Material-UI (optional)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Email Service**: Mailtrap

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Mailtrap account for email testing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arafatDU/mern-advanced-auth.git
   cd mern-advanced-auth
   ```

2. Install dependencies for the root project:
   ```bash
   npm install
   ```

3. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the `backend` folder with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     MAILTRAP_USER=your_mailtrap_username
     MAILTRAP_PASS=your_mailtrap_password
     ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the backend server located at `backend/index.js`.

## Usage

1. Register a new user.
2. Check your Mailtrap inbox for the verification email.
3. Verify your email to activate your account.
4. Log in to access protected routes.

## Folder Structure

```
mern-advanced-auth/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── index.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
├── package.json
└── README.md
```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Mailtrap](https://mailtrap.io/) for email testing
- [MERN Stack Documentation](https://www.mongodb.com/mern-stack)

Feel free to contribute to this project by submitting issues or pull requests!
# PinNote - A Note-Taking App

PinNote is a note-taking application that allows users to create and manage notes on their own user accounts. It is powered by **React, Node.js, Express.js and PostgreSQL**. The app provides a simple and clear user interface to add, view, and delete notes. It is inspired by Google Keep but offers a more simplified and smoother UI with only the essential note taking features.

## Key Features

- **Add Notes**: Easily create notes with titles and content that are saved automatically.
- **Delete Notes**: Remove notes when they are no longer needed.
- **User Authentication**: Log in to your account to securely store and access your personal notes.
- **Registration, Login & Delete Account**: New users can sign up, existing users can log in to view their notes and have possibility to delete their account.
- **Database Integration**: User information and notes are securely stored in a PostgreSQL database.

![login page](/public/login.jpg)

![register form](/public/register.jpg)

![User page](/public/notes.jpg)

## Authentication

**Login**: Users can log in with their credentials to access their saved notes.

**Registration**: New users can create an account to start using the app and saving notes.

**Delete Account**: Users have possibility to delete their account after login.

## Install & Run Locally

Clone the repository

```
git clone git@github.com:svolain/PinNote-App.git
```

Navigate to frontend directory and compile according to vite config (front- and backend use the same port)

```
cd PinNote-App/frontend
npm run build
```

Navigate to backend directory

```
cd ../backend/
```

Note that all the crucial credentials and keys are held in .env which is not pushed into this repository.
Before running the code make an .env file in the root of backend directory. Here is an example of the file with variable names:

```
DB_USER=example // your postgres username
DB_PASS=example // your postgres password
DB_NAME=example // name of the to be created database
DB_HOST=example // if running postgres locally use localhost
DB_PORT=example // usually the default port for postgres
JWT_SECRET=example //for signing and verifying JSON Web Tokens, recommended to include letters, numbers and special characters, and to be at least 20 characters long
```

Make sure you have postgres installed and running. You have to sign into postgres and create a database with the same name as .env DB_NAME, and create 2 tables into it according to schemas listed below in database section of Tech details.

Run server.js and navigate to localhost:5000 in your browser

```
node server.js
```

## Tech Details

The Frontend is made with React with custom API to connect it with backend server and database. Backend is powered by node and express.js, whith integrated Postgres Database.

### Frontend

The frontend is structured in React components that manage user input, handle API requests, and conditionally render content based on the authentication state. React hooks (useState, useEffect) are used to manage component state and perform actions like fetching data and handling form submissions. The frontend communicates with the backend via Axios, using JWT tokens for user authentication and authorization.

#### App.jsx

The core of the application, App.jsx is the parent component that handles the user authentication flow, manages notes, and renders different views based on the user's state. It uses child components such as CreateNote, Footer, Header, Note, Login and Register, which all are stored in their own jsx files.

##### User State Management:

- Tracks if a user is logged in or not
- Manages notes for the authenticated user

##### useEffect Hook:

On initial load, the useEffect hook fetches the stored token and user information from localStorage. If valid, it fetches the user’s notes from the backend.
This is triggered only once when the component mounts, making it an ideal place for authentication and fetching user-specific data.

Conditional Rendering:

If the user is logged in, it shows the notes and allows the user to add new notes. If not, it renders the login or registration forms.

### Backend

The backend is built with Node.js and Express.js, providing a scalable environment for handling HTTP requests and managing user authentication. The authentication system uses JWT to secure user sessions, and bcrypt is employed for securely hashing passwords before storing them in the database.

#### API Endpoints

The backend exposes several routes for interacting with the user and notes data.

##### userRoutes.js

POST /api/users/register: Registers a new user. Hashes the user's password and stores it in the database.

POST /api/users/login: Logs a user in by verifying their credentials and issuing a JWT token.

##### noteRoutes.js

GET /api/notes: Fetches all notes for the authenticated user.

POST /api/notes: Creates a new note for the authenticated user.

DELETE /api/notes/:id: Deletes a note for the authenticated user.

#### How It Works Together

**User Registration**: A new user submits a registration request, their password is hashed using bcrypt, and the user is stored in the PostgreSQL database.

**User Login**: The user logs in, their credentials are verified, and if valid, a JWT token is generated.

**Note Management**: The user can create, view, and delete notes. Each note is associated with the user's userId in the database.

### Database

All user data and notes are stored in a PostgreSQL database, providing secure and persistent storage across sessions.

Passwords are hashed and salted using the bcrypt library before being stored in the PostgreSQL database, ensuring secure password storage. The bcrypt.hash() function is used to generate a hashed password with a salt factor of 10.

```
 const hashedPassword = await bcrypt.hash(password, 10);
```

SQL Schemas for the Users and Notes Tables

```
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,                -- Unique user identifier, automatically incremented
  username VARCHAR(255) UNIQUE NOT NULL, -- Username must be unique and cannot be null
  password TEXT NOT NULL                -- Password is stored as a text field and cannot be null
);

-- Notes table
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,                -- Unique note identifier, automatically incremented
  title TEXT NOT NULL,                  -- Title of the note, cannot be null
  content TEXT NOT NULL,                -- Content of the note, cannot be null
  userId INT NOT NULL,                  -- Foreign key to link the note to a user
  CONSTRAINT fk_user                    -- Foreign key constraint to ensure userId exists in the users table
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE  -- Cascades the deletion of notes if the user is deleted
);
```
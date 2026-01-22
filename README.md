# Profile.io

**Profile.io** is a full-stack web application where users can sign up, log in, add and manage their personal data.  
Administrators have elevated permissions to view all users, manage user accounts, and handle everyone's data.

## Main Features

- User registration & login (JWT authentication)
- Users can create, view, update and delete **their own data**
- Admin dashboard to:
  - View and manage all user accounts
  - View, search, edit and delete any user's data
- Role-based access control (user vs admin)
- Responsive single-page application

## Technology Stack

| Layer       | Technologies                            |
|-------------|-----------------------------------------|
| Frontend    | React · Redux · Axios                   |
| Backend     | Node.js · Express                       |
| Database    | MongoDB + Mongoose                      |
| Auth        | JWT (JSON Web Tokens) + bcrypt          |
| State       | Redux (global auth & data state)        |
| Others      | dotenv, cors, nodemon (dev)             |

## Core Flows

### User
1. Sign up / Log in
2. Go to personal dashboard
3. Add new records / edit / delete own entries

### Admin
1. Log in with an admin account
2. Access admin panel
3. View list of users
4. See / search / modify / delete any user's data

## Important API Endpoints (examples)

### Authentication

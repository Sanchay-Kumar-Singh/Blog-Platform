# 📝 MERN Blog Platform

A full-stack **MERN Blog Platform** built with **MongoDB, Express.js, React.js, and Node.js**. The application provides JWT-based authentication, protected routes, blog creation and management, user authentication, and a clean separation between frontend and backend.

🌐 **Live Demo:**
https://blog-platform-4l1r.vercel.app/

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected frontend routes
* Protected backend routes
* JWT token stored in `localStorage`
* User information is **not stored in `localStorage`
* Authenticated user data is fetched using `/auth/me`
* Fresh user information is retrieved from MongoDB
* Authentication middleware for protected API routes

### 📝 Blog Features

* Create blog posts
* View all blogs
* View individual blog details
* Write and publish blogs
* Blog data managed through React Context API
* Protected blog operations
* RESTful backend APIs

### 🎨 Frontend

* React.js
* Vite
* HTML5
* CSS3
* Tailwind CSS
* React Context API
* Axios
* React Router
* Reusable components
* Protected routing

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* REST API
* CORS
* Environment variables
* Controller-based architecture
* Middleware-based authentication

---

# 🛠️ Tech Stack

| Category         | Technologies                            |
| ---------------- | --------------------------------------- |
| Frontend         | React.js, Vite, JavaScript, HTML5, CSS3 |
| Styling          | Tailwind CSS                            |
| State Management | React Context API                       |
| Routing          | React Router                            |
| HTTP Client      | Axios                                   |
| Backend          | Node.js, Express.js                     |
| Database         | MongoDB                                 |
| ODM              | Mongoose                                |
| Authentication   | JSON Web Token (JWT)                    |
| API              | REST API                                |
| Deployment       | Vercel                                  |

---

# 📂 Project Structure

The project is organized into separate frontend and backend applications.

```text
Blog-Platform/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── vercel.json
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── BlogContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── BlogDetails.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── WriteBlog.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🏗️ Architecture

The application follows a clear separation of responsibilities.

```text
                         ┌─────────────────────┐
                         │      React App      │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      api.js         │
                         │   API Configuration │
                         └──────────┬──────────┘
                                    │
                           HTTP / REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Server    │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
              ┌──────────┐   ┌────────────┐  ┌─────────────┐
              │  Routes  │   │ Middleware │  │ Controllers │
              └──────────┘   └────────────┘  └──────┬──────┘
                                                     │
                                                     ▼
                                              ┌─────────────┐
                                              │  Mongoose   │
                                              │   Models    │
                                              └──────┬──────┘
                                                     │
                                                     ▼
                                              ┌─────────────┐
                                              │   MongoDB   │
                                              └─────────────┘
```

---

# 🔐 Authentication Flow

The application uses **JWT-based authentication**.

```text
User
 │
 ├── Register
 │
 ▼
Register API
 │
 ▼
Validate User
 │
 ▼
Hash Password
 │
 ▼
Save User → MongoDB
 │
 ▼
Generate JWT
 │
 ▼
Return Token
 │
 ▼
Frontend
 │
 ▼
localStorage
```

For login:

```text
User
 │
 ▼
Login Page
 │
 ▼
POST /api/auth/login
 │
 ▼
Backend
 │
 ├── Find User
 │
 ├── Compare Password
 │
 └── Generate JWT
 │
 ▼
Return JWT
 │
 ▼
Frontend
 │
 ▼
localStorage
```

---

# 🔑 JWT Token Handling

Only the JWT token is stored in `localStorage`.

```javascript
localStorage.setItem("token", res.data.token);
```

The application does **not** store the complete user object in `localStorage`.

When authenticated user information is required, the frontend requests:

```http
GET /api/auth/me
```

The backend then:

```text
JWT Token
    │
    ▼
Authentication Middleware
    │
    ▼
Verify JWT
    │
    ▼
Extract User ID
    │
    ▼
Find User in MongoDB
    │
    ▼
Return Fresh User Data
```

This means the application gets the latest user information directly from the database instead of relying on potentially outdated browser data.

---

# 🔄 Blog Data Flow

Blog-related API operations are centralized through `BlogContext.jsx`.

```text
React Component
      │
      ▼
BlogContext.jsx
      │
      ▼
api.js
      │
      ▼
Express API
      │
      ▼
blogRoutes.js
      │
      ▼
blogController.js
      │
      ▼
Blog.js
      │
      ▼
MongoDB
      │
      ▼
JSON Response
      │
      ▼
BlogContext
      │
      ▼
React Components
```

---

# 📡 API Endpoints

## Authentication Routes

| Method | Endpoint             | Description            | Protected |
| ------ | -------------------- | ---------------------- | --------- |
| `POST` | `/api/auth/register` | Register a new user    | ❌         |
| `POST` | `/api/auth/login`    | Login an existing user | ❌         |
| `GET`  | `/api/auth/me`       | Get authenticated user | ✅         |

---

## Blog Routes

| Method   | Endpoint         | Description    | Protected   |
| -------- | ---------------- | -------------- | ----------- |
| `GET`    | `/api/blogs`     | Get all blogs  | ❌ / Depends |
| `GET`    | `/api/blogs/:id` | Get blog by ID | ❌ / Depends |
| `POST`   | `/api/blogs`     | Create a blog  | ✅           |
| `PUT`    | `/api/blogs/:id` | Update a blog  | ✅           |
| `DELETE` | `/api/blogs/:id` | Delete a blog  | ✅           |

> The exact available methods depend on the routes implemented in the backend.

---

# 📁 Backend Architecture

### `config/`

Contains backend configuration files.

```text
config/
└── db.js
```

`db.js` handles the MongoDB database connection.

---

### `controllers/`

Contains the application's business logic.

```text
controllers/
├── authController.js
└── blogController.js
```

* `authController.js` → Registration, login, authenticated user logic
* `blogController.js` → Blog-related operations

---

### `middleware/`

Contains reusable Express middleware.

```text
middleware/
└── authMiddleware.js
```

`authMiddleware.js` validates JWT tokens and protects private routes.

---

### `models/`

Contains Mongoose database schemas.

```text
models/
├── User.js
└── Blog.js
```

---

### `routes/`

Contains API route definitions.

```text
routes/
├── authRoutes.js
└── blogRoutes.js
```

Routes forward requests to the appropriate controllers.

---

# 📁 Frontend Architecture

### `api/`

There is one centralized API file:

```text
src/api/api.js
```

This file is responsible for configuring communication between the React frontend and Express backend.

---

### `components/`

Reusable UI components:

```text
components/
├── BlogCard.jsx
├── Footer.jsx
├── Navbar.jsx
└── ProtectedRoute.jsx
```

---

### `context/`

Blog state and API operations are managed through:

```text
context/
└── BlogContext.jsx
```

This avoids duplicating blog API logic across multiple pages.

---

### `pages/`

Application pages:

```text
pages/
├── Home.jsx
├── Blogs.jsx
├── BlogDetails.jsx
├── Dashboard.jsx
├── Login.jsx
├── Register.jsx
└── WriteBlog.jsx
```

Authentication logic is handled directly in:

```text
Login.jsx
Register.jsx
```

---

# ⚙️ Environment Variables

## Backend `.env`

Create:

```text
backend/.env
```

Use:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

### Backend Variables

| Variable     | Purpose                                      |
| ------------ | -------------------------------------------- |
| `PORT`       | Express server port                          |
| `MONGO_URI`  | MongoDB connection string                    |
| `JWT_SECRET` | Secret used for JWT signing and verification |
| `CLIENT_URL` | Frontend URL used for CORS configuration     |

---

## Frontend `.env`

Create:

```text
frontend/.env
```

Use:

```env
VITE_BASE_URL=http://localhost:5000/api
```

### Frontend Variable

| Variable        | Purpose                           |
| --------------- | --------------------------------- |
| `VITE_BASE_URL` | Base URL for backend API requests |

---

# ⚠️ Environment Variable Security

**Never commit real credentials to GitHub.**

Your `.env` files should be included in `.gitignore`:

```gitignore
.env
.env.local
.env.production
```

Use placeholder values when documenting your project:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> If credentials have already been pushed to a public GitHub repository, rotating them is not enough by itself if the old values remain in Git history. Remove the exposed secrets from the repository history as well.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB account/database
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Blog-Platform.git
```

```bash
cd Blog-Platform
```

---

# 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# 3. Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🌐 Deployment

The frontend is deployed using **Vercel**.

### Production URL

https://blog-platform-4l1r.vercel.app/

For production, update the frontend environment variable:

```env
VITE_BASE_URL=YOUR_DEPLOYED_BACKEND_URL/api
```

And configure the backend:

```env
CLIENT_URL=https://blog-platform-4l1r.vercel.app
```

Make sure MongoDB allows connections from your deployed backend environment.

---

# 🧪 Local Development

After starting both applications:

```text
Frontend
http://localhost:5173
       │
       │ API Requests
       ▼
Backend
http://localhost:5000
       │
       ▼
MongoDB
```

---

# 🛡️ Security Practices

The project implements the following security practices:

* JWT-based authentication
* Protected API routes
* Protected frontend routes
* Password hashing
* Environment-based secrets
* MongoDB credentials stored in `.env`
* JWT secret stored in `.env`
* CORS configuration
* Fresh user data retrieval from MongoDB
* No user object stored in `localStorage`

---

# 📈 Future Improvements

Potential improvements for future versions:

* [ ] Blog image uploads
* [ ] Rich text editor
* [ ] Blog categories
* [ ] Tags
* [ ] Search functionality
* [ ] Pagination
* [ ] Comments
* [ ] Likes
* [ ] Bookmarks
* [ ] User profiles
* [ ] Edit blog functionality
* [ ] Delete blog functionality
* [ ] Admin dashboard
* [ ] Refresh token authentication
* [ ] HTTP-only cookie authentication
* [ ] Email verification
* [ ] Password reset
* [ ] API rate limiting
* [ ] Request validation
* [ ] Automated testing
* [ ] CI/CD pipeline

---

# 🎯 What I Learned

Building this project helped strengthen practical knowledge of:

* Full-stack MERN development
* REST API design
* JWT authentication
* Protected routes
* MongoDB and Mongoose
* React Context API
* React Router
* Axios API integration
* Express middleware
* MVC-style backend organization
* Environment variable management
* CORS configuration
* Frontend/backend deployment
* Production application structure

---

# 👨‍💻 Author

## Sanchay Kumar Singh

**Computer Science Engineer | Full-Stack Developer**

### Connect With Me

* GitHub: `https://github.com/YOUR_USERNAME`
* LinkedIn: `https://www.linkedin.com/in/YOUR_USERNAME/`
* Portfolio: `https://sanchay-singh-portfolio.vercel.app/`

---

# ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and portfolio purposes.

<h1> 📝 MERN Blog Platform</h1>

A full-stack **Blog Platform** built with the **MERN Stack** — MongoDB, Express.js, React.js, and Node.js.

The platform provides secure JWT-based authentication, user management, and blog functionality with a clean frontend/backend architecture. Authentication tokens are stored on the client, while user information is always fetched fresh from the backend and MongoDB.

🌐 **Live Demo:** https://blog-platform-4l1r.vercel.app/

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration
- User login
- JWT-based authentication
- Protected routes
- JWT token stored in `localStorage`
- User information is **not** stored in `localStorage`
- `/auth/me` endpoint for retrieving the authenticated user's latest information
- Backend validates the JWT before accessing protected resources

### 📝 Blog Management

- Create blog posts
- Fetch blog posts
- Display blog content
- Centralized blog API management using React Context
- Protected blog operations where required

### 🎨 Frontend

- React.js
- Vite
- HTML5
- CSS3
- Responsive UI
- React Context API
- Centralized API configuration
- Component-based architecture

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- RESTful APIs
- Middleware-based authentication
- Environment variable configuration

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Context API
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- dotenv
- CORS

### Deployment

- Frontend: Vercel
- Backend: Node.js / Express.js
- Database: MongoDB

---

## 📂 Project Structure

### Frontend

```text
src/
├── api/
│   └── api.js
│
├── context/
│   └── BlogContext.jsx
│
├── components/
│
├── pages/
│
├── App.jsx
├── main.jsx
└── index.css

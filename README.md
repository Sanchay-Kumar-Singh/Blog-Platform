<h1>📝 MERN Blog Platform</h1>

A full-stack **MERN Blog Platform** built with **MongoDB, Express.js, React.js, and Node.js**, featuring JWT authentication, protected routes, blog management, and a clean frontend/backend architecture.

🌐 **Live Demo:** https://blog-platform-4l1r.vercel.app/
---

## ✨ Features

* 🔐 JWT-based user authentication
* 🛡️ Protected frontend and backend routes
* 📝 Create and view blog posts
* 👤 Fresh user data fetched from MongoDB using `/auth/me`
* 💾 Only JWT token is stored in `localStorage`
* ⚡ React Context API for blog state management
* 🎨 Responsive UI with Tailwind CSS
* 🔗 RESTful API with Express.js
* 🍃 MongoDB database with Mongoose

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, JavaScript, HTML5, CSS3, Tailwind CSS, React Context API, Axios

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, CORS

**Deployment:** Vercel

---

## 📂 Project Structure

```text
Blog-Platform/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── BlogContext.jsx
│   │   ├── pages/
│   │   │   ├── BlogDetails.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── WriteBlog.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── .env
│
└── README.md
```

---

## 🔐 Authentication

The application uses **JWT authentication**.

Only the JWT token is stored in `localStorage`:

```js
localStorage.setItem("token", res.data.token);
```

User information is **not** stored in `localStorage`. When required, the frontend calls:

```http
GET /api/auth/me
```

The backend verifies the JWT and fetches the latest user data directly from MongoDB.

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_BASE_URL=http://localhost:5000/api
```

> Never commit real credentials or `.env` files to GitHub.

---

## 🚀 Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

---

## 🌐 Live Demo

**Production:** https://blog-platform-4l1r.vercel.app/

---

## 👨‍💻 Author

**Sanchay Kumar Singh**

Computer Science Engineer | Full-Stack Developer

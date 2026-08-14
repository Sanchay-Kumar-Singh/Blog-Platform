# Simple MERN Blog Platform

## Frontend

```text
src/
├── api/
│   └── api.js
├── context/
│   └── BlogContext.jsx
├── components/
├── pages/
├── App.jsx
├── main.jsx
└── index.css
```

There is only one API file: `api.js`.

Authentication is handled directly in `Login.jsx` and `Register.jsx`.

Blog API calls are handled in `BlogContext.jsx`.

Only the JWT token is stored in localStorage:

```js
localStorage.setItem("token", res.data.token);
```

User information is never stored in localStorage. When user information is needed, the frontend calls `/auth/me`, and the backend gets fresh user data from MongoDB.

## Backend

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
└── server.js
```

Frontend `.env`:

```env
VITE_BASE_URL=http://localhost:5000/api
```

Backend `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

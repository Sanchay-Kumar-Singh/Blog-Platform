import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-3">Login</h1>
      <p className="text-gray-500 mb-8">Welcome back to Blog.</p>

      {message && (
        <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-5">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="email" type="email" placeholder="Email"
          value={form.email} onChange={handleChange} required
          className="w-full border rounded-xl px-4 py-3 outline-none" />

        <input name="password" type="password" placeholder="Password"
          value={form.password} onChange={handleChange} required
          className="w-full border rounded-xl px-4 py-3 outline-none" />

        <button className="w-full bg-black text-white rounded-xl py-3">
          Login
        </button>
      </form>

      <p className="text-center mt-7 text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
}

export default Login;

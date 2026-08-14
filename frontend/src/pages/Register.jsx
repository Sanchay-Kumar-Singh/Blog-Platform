import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-3">Create Account</h1>
      <p className="text-gray-500 mb-8">Start writing your own blogs.</p>

      {message && (
        <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-5">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="name" placeholder="Name" value={form.name}
          onChange={handleChange} required
          className="w-full border rounded-xl px-4 py-3 outline-none" />

        <input name="email" type="email" placeholder="Email" value={form.email}
          onChange={handleChange} required
          className="w-full border rounded-xl px-4 py-3 outline-none" />

        <input name="password" type="password" placeholder="Password" value={form.password}
          onChange={handleChange} required
          className="w-full border rounded-xl px-4 py-3 outline-none" />

        <button className="w-full bg-black text-white rounded-xl py-3">
          Register
        </button>
      </form>

      <p className="text-center mt-7 text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
}

export default Register;

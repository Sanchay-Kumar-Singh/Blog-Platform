import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useBlog } from "../context/BlogContext";

function Dashboard() {
  const { blogs, getBlogs, deleteBlog } = useBlog();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
    getBlogs();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const myBlogs = blogs.filter(
    (blog) => blog.author?._id === user?.id
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBlog(id);
      getBlogs();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Welcome back, {user?.name}
          </p>
        </div>

        <Link to="/write"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl">
          + New Blog
        </Link>
      </div>

      {myBlogs.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center">
          <p className="text-gray-500 mb-5">
            You have not published any blogs yet.
          </p>
          <Link to="/write" className="text-blue-600">
            Write your first blog →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-2xl">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myBlogs.map((blog) => (
                <tr key={blog._id} className="border-t">
                  <td className="p-4 font-medium">{blog.title}</td>
                  <td className="p-4">{blog.category}</td>
                  <td className="p-4 text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <Link to={`/edit/${blog._id}`} className="text-blue-600">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

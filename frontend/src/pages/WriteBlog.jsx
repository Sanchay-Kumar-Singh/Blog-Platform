import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

function WriteBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBlog, createBlog, updateBlog } = useBlog();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "Technology",
    tags: "",
    coverImage: "",
    content: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      loadBlog();
    }
  }, [id]);

  const loadBlog = async () => {
    try {
      const blog = await getBlog(id);

      setForm({
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        tags: blog.tags.join(", "),
        coverImage: blog.coverImage,
        content: blog.content
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      const data = {
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      };

      if (id) {
        await updateBlog(id, data);
      } else {
        await createBlog(data);
      }

      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="text-4xl font-bold mb-2">
        {id ? "Edit Blog" : "Write a Blog"}
      </h1>

      <p className="text-gray-500 mb-10">
        {id
          ? "Update your blog details."
          : "Share your ideas with the world."}
      </p>

      {message && (
        <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-5">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Blog title"
            required
            className="w-full border rounded-xl px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Excerpt</label>
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Short summary"
            className="w-full border rounded-xl px-4 py-3 outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium mb-2">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Technology</option>
              <option>AI</option>
              <option>Science</option>
              <option>Business</option>
              <option>Health</option>
              <option>Lifestyle</option>
              <option>Education</option>
              <option>Travel</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="react, nodejs, mongodb"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Cover Image URL
          </label>
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded-xl px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            required
            rows="14"
            className="w-full border rounded-xl px-4 py-3 outline-none resize-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="border px-6 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button className="bg-black text-white px-7 py-3 rounded-xl">
            {id ? "Update Blog" : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WriteBlog;

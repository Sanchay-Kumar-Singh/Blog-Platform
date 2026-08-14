import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../context/BlogContext";

function Home() {
  const { blogs, getBlogs } = useBlog();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBlogs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      window.location.href = `/blogs?search=${encodeURIComponent(search)}`;
    }
  };

  const categories = [
    "Technology",
    "AI",
    "Science",
    "Business",
    "Health",
    "Lifestyle"
  ];

  return (
    <>
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block border rounded-full px-5 py-2 text-sm mb-8">
            ✨ A simple blogging platform
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-7">
            Your own blogging
            <br />
            platform.
          </h1>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Create, publish and explore amazing blogs.
            Share your ideas and stories with the world.
          </p>

          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto flex border rounded-xl overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-4 outline-none"
            />

            <button className="bg-black text-white px-8">
              Search
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/blogs?category=${category}`}
                className="border rounded-full px-5 py-2 text-sm hover:bg-black hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Link to="/blogs" className="font-semibold">
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 mt-24 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Blog?
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-5">
          {[
            ["✍️", "Easy Writing", "Write your ideas in a simple editor."],
            ["⚡", "Fast Publishing", "Create and publish content quickly."],
            ["🔒", "Secure Login", "JWT authentication protects your account."],
            ["📱", "Responsive", "Use the platform on any device."]
          ].map((item) => (
            <div key={item[1]} className="bg-white border rounded-2xl p-6">
              <div className="text-3xl mb-4">{item[0]}</div>
              <h3 className="font-bold mb-2">{item[1]}</h3>
              <p className="text-gray-500 text-sm">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

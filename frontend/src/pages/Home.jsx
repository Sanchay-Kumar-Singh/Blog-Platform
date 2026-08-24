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

  const featuredBlog = blogs[0];

  return (
    <>
      <section className="py-24 px-6 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-blue-50 border border-blue-200 text-blue-600 rounded-full px-5 py-2 text-sm font-medium mb-8">
            ✨ A simple blogging platform
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-7">
            Your own
            <br />
            <span className="text-blue-600">blogging platform.</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Create, publish and explore amazing blogs.
            <br />
            Share your ideas and stories with the world.
          </p>

          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto flex border border-gray-200 rounded-2xl overflow-hidden shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-4 outline-none text-gray-700"
            />

            <button
              type="submit"
              className="bg-black text-white px-8 font-medium hover:bg-blue-600 transition"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/blogs?category=${category}`}
                className="border border-gray-200 rounded-full px-5 py-2 text-sm text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-blue-600 text-sm font-semibold mb-1">
              EXPLORE
            </p>

            <h2 className="text-3xl font-bold">
              Latest Articles
            </h2>
          </div>

          <Link
            to="/blogs"
            className="font-semibold hover:text-blue-600 transition"
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>

      {featuredBlog && (
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-blue-600"></span>

            <p className="text-blue-600 text-sm font-semibold tracking-wider">
              FEATURED STORY
            </p>
          </div>

          <div className="grid md:grid-cols-2 bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden">

            <div className="h-80 md:h-[430px] overflow-hidden">
              <img
                src={
                  featuredBlog.coverImage ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                }
                alt={featuredBlog.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="w-fit bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
                {featuredBlog.category}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                {featuredBlog.title}
              </h2>

              <p className="text-gray-500 leading-7 mb-7 line-clamp-3">
                {featuredBlog.excerpt}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {featuredBlog.author?.name?.charAt(0) || "B"}
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    {featuredBlog.author?.name || "BlogNova Writer"}
                  </p>

                  <p className="text-gray-400 text-xs">
                    Featured article
                  </p>
                </div>
              </div>

              <Link
                to={`/blogs/${featuredBlog._id}`}
                className="w-fit bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition"
              >
                Read Full Story →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-50 border-y border-gray-100 mt-24 py-20 px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold mb-2">
            WHY BLOGNOVA?
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need to share ideas.
          </h2>

          <p className="text-gray-500 mt-3">
            Simple tools designed for writers and readers.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-5">
          {[
            ["✍️", "Easy Writing", "Write your ideas in a simple editor."],
            ["⚡", "Fast Publishing", "Create and publish content quickly."],
            ["🔒", "Secure Login", "JWT authentication protects your account."],
            ["📱", "Responsive", "Use the platform on any device."]
          ].map((item) => (
            <div
              key={item[1]}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-5">
                {item[0]}
              </div>

              <h3 className="font-bold mb-2">
                {item[1]}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {item[2]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
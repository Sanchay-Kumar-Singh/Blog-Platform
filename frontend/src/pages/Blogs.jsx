import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../context/BlogContext";

function Blogs() {
  const { blogs, getBlogs } = useBlog();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  useEffect(() => {
    getBlogs({ search, category });
  }, [search, category]);

  const categories = [
    "All",
    "Technology",
    "AI",
    "Science",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel"
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">All Blogs</h1>
        <p className="text-gray-500">
          Explore articles written by our community.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          value={search}
          onChange={(e) =>
            setSearchParams({
              search: e.target.value,
              category
            })
          }
          placeholder="Search blogs..."
          className="flex-1 border rounded-xl px-5 py-3 outline-none"
        />

        <select
          value={category}
          onChange={(e) =>
            setSearchParams({
              search,
              category: e.target.value
            })
          }
          className="border rounded-xl px-5 py-3"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No blogs found.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-7">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;

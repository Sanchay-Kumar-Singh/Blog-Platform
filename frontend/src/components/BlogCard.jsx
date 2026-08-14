import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      <img
        src={
          blog.coverImage ||
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80"
        }
        alt={blog.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-blue-600 font-semibold uppercase">
            {blog.category}
          </span>
        </div>

        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-gray-500 text-sm line-clamp-2 mb-5">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            By {blog.author?.name || "Unknown"}
          </span>

          <Link
            to={`/blogs/${blog._id}`}
            className="text-blue-600 font-semibold text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;

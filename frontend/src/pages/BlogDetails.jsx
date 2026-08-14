import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

function BlogDetails() {
  const { id } = useParams();
  const { getBlog } = useBlog();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await getBlog(id);
        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="text-center py-20">
        Loading blog...
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/blogs" className="text-blue-600 text-sm">
        ← Back to Blogs
      </Link>

      <div className="mt-8">
        <span className="text-blue-600 font-semibold text-sm uppercase">
          {blog.category}
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-4 mb-6">
          {blog.title}
        </h1>

        <p className="text-gray-500 text-lg mb-7">
          {blog.excerpt}
        </p>

        <p className="text-sm text-gray-500 mb-8">
          By {blog.author?.name || "Unknown"} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover rounded-2xl mb-10"
          />
        )}

        <div className="whitespace-pre-line text-lg leading-8 text-gray-700">
          {blog.content}
        </div>

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 rounded-full px-4 py-2 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default BlogDetails;

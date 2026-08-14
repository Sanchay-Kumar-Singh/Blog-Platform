const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      category,
      tags,
      coverImage,
      content
    } = req.body;

    const blog = await Blog.create({
      title,
      excerpt,
      category,
      tags: Array.isArray(tags) ? tags : [],
      coverImage,
      content,
      author: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Blog published",
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot edit this blog"
      });
    }

    const {
      title,
      excerpt,
      category,
      tags,
      coverImage,
      content
    } = req.body;

    blog.title = title;
    blog.excerpt = excerpt;
    blog.category = category;
    blog.tags = Array.isArray(tags) ? tags : [];
    blog.coverImage = coverImage;
    blog.content = content;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated",
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this blog"
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
};

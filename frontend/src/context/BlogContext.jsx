import { createContext, useContext, useState } from "react";
import api from "../api/api";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async (params) => {
    const res = await api.get("/blogs", { params });
    setBlogs(res.data.blogs);
    return res.data.blogs;
  };

  const getBlog = async (id) => {
    const res = await api.get(`/blogs/${id}`);
    return res.data.blog;
  };

  const createBlog = async (data) => {
    const token = localStorage.getItem("token");

    const res = await api.post("/blogs", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  };

  const updateBlog = async (id, data) => {
    const token = localStorage.getItem("token");

    const res = await api.put(`/blogs/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  };

  const deleteBlog = async (id) => {
    const token = localStorage.getItem("token");

    const res = await api.delete(`/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  };

  return (
    <BlogContext.Provider
      value={{ blogs, getBlogs, getBlog, createBlog, updateBlog, deleteBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  return useContext(BlogContext);
};

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    coverImage: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

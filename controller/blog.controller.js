import Blog from "../models/blog.model.js";
import dotenv from 'dotenv';
import multer from "multer";

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    // console.log("Blog Request Body:", req.body);
    // console.log("Uploaded File:", req.file);

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
    const image = req.file ? `${backendURL}/uploads/${req.file.filename}` : "";

    const newBlog = new Blog({
      title,
      content,
      image,
      author: req.user.id,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    // console.error(" Error creating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const backendURL = process.env.BACKEND_URL || "http://localhost:5000";
    const image = req.file ? `${backendURL}/uploads/${req.file.filename}` : blog.image;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image;

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete a blog post (only author can delete)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

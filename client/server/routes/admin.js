const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

/**
 * Middleware: Check Login
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

/**
 * POST /admin/login
 * Admin - Login
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /admin/dashboard
 * Admin - Dashboard Data
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
});

/**
 * POST /admin/add-post
 * Admin - Create New Post
 */
router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body
    });

    await newPost.save();
    res.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// GET /admin/posts/:id - Get a specific post for editing
router.get('/posts/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);  // Return the post data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to load post' });
  }
});


/**
 * PUT /admin/edit-post/:id
 * Admin - Update Post
 */
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

/**
 * DELETE /admin/delete-post/:id
 * Admin - Delete Post
 */
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

/**
 * POST /admin/register
 * Admin - Register New User
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: 'Username already in use' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /admin/logout
 * Admin - Logout
 */
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

/**
 * GET /admin/check-auth
 * Admin - Check if logged in
 */
router.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ loggedIn: true, userId: decoded.userId });
  } catch {
    res.status(401).json({ loggedIn: false });
  }
});

module.exports = router;

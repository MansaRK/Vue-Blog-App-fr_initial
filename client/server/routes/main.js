const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET /api/posts (with pagination)
router.get('/api/posts', async (req, res) => {
  try {
    let perPage = 10;
    let page = parseInt(req.query.page) || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const totalPages = Math.ceil(count / perPage);

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    res.json({
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDB.",
      data,
      currentPage: page,
      nextPage,
      prevPage,
      totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// GET /api/posts/:id (single post)
router.get('/api/posts/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    res.json({
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDB.",
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/search (search posts)
router.get('/api/search', async (req, res) => {
  try {
    let searchTerm = req.query.term || ""
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
      ]
    })

    res.json({
      title: "Search Results",
      description: "Simple Blog created with NodeJs, Express & MongoDB.",
      data
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

// GET /api/about
router.get('/api/about', (req, res) => {
  res.json({
    page: "about",
    description: "This is the about page for the blog."
  });
});


// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertPostData();

module.exports = router;
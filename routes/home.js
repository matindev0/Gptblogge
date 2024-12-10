const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Home Page
router.get("/", async (req, res) => {
    const posts = await Post.find();
    res.render("home", { posts });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Login Page
router.get("/login", (req, res) => {
    res.render("admin/login");
});

// Login Logic
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect("/admin/dashboard");
    } else {
        res.send("Invalid username or password");
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login");
    });
});

// Dashboard
router.get("/dashboard", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/admin/login");
    }
    res.render("admin/dashboard");
});

module.exports = router;
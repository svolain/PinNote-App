const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {

  console.log("Received registration data:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    console.error("Error: Missing username or password");
    return res.status(400).json({ error: "Username and password are required" });
  }
  
  if (!username || !password) {
    console.error("Error: Missing username or password");
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await userModel.registerUser(username, password);
    res.status(201).json({ userId: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findUserByUsername(username);
    if (user && await userModel.validatePassword(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, userId: user.id });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.delete("/:id", authenticateUser, async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (req.user.userId !== userId) {
    return res.status(403).json({ error: "Not authorized to delete this account" });
  }

  try {
    await userModel.deleteUserById(userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

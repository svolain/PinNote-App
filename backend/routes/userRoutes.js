const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
        [username, hashedPassword]
      );
      res.status(201).json({ userId: result.rows[0].id });
    } catch (err) {
      res.status(400).json({ error: "Username already exists" });
    }
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = userResult.rows[0];
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router;
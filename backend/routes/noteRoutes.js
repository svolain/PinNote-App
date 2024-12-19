const express = require("express");
const pool = require("../db/pool");

const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.user.userId;
  const result = await pool.query("SELECT * FROM notes WHERE userId = $1", [userId]);
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;
  const result = await pool.query(
    "INSERT INTO notes (title, content, userId) VALUES ($1, $2, $3) RETURNING *",
    [title, content, userId]
  );
  res.status(201).json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  await pool.query("DELETE FROM notes WHERE id = $1 AND userId = $2", [id, userId]);
  res.status(204).send();
});

module.exports = router;
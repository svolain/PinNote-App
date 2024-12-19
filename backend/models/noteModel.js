const pool = require("../db/pool");

const getNotesByUserId = async (userId) => {
  const result = await pool.query("SELECT * FROM notes WHERE userId = $1", [userId]);
  return result.rows;
};

const createNote = async (title, content, userId) => {
  const result = await pool.query(
    "INSERT INTO notes (title, content, userId) VALUES ($1, $2, $3) RETURNING *",
    [title, content, userId]
  );
  return result.rows[0];
};

const deleteNote = async (noteId, userId) => {
  const result = await pool.query(
    "DELETE FROM notes WHERE id = $1 AND userId = $2 RETURNING *",
    [noteId, userId]
  );
  return result.rows[0];
};

module.exports = { getNotesByUserId, createNote, deleteNote };


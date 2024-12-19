const pool = require("../db/pool");
const bcrypt = require("bcrypt");

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error("Username already exists");
  }
};

const findUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { registerUser, findUserByUsername, validatePassword };
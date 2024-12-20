import React, { useState } from "react";
import { loginUser } from "../../api";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ username: credentials.username, id: data.userId }));
      
      onLogin(credentials, data);
    } catch (err) {
      setError("Invalid username or password");
    }
  }

  return (
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
  );
}

export default Login;



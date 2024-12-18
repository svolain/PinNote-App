import React, { useState } from "react";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(credentials);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Login;
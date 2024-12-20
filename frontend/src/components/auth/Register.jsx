import React, {useState} from "react";
import { registerUser } from "../../api";

function Register({ onRegister }) {
    const [credentials, setCredentials] = useState({
      username: "",
      password: "",
      confirmPassword: "",
    });

    const [error, setError] = useState("");
  
    function handleChange(event) {
      const { name, value } = event.target;
      setCredentials((prev) => ({ ...prev, [name]: value }));
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await registerUser(credentials);
        onRegister();
      } catch (err) {
        setError("Username already exists");
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
    );
  }
  
  export default Register;
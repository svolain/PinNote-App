import React, {useState} from "react";

function Register({ onRegister }) {
    const [credentials, setCredentials] = useState({
      username: "",
      password: "",
      confirmPassword: "",
    });
  
    function handleChange(event) {
      const { name, value } = event.target;
      setCredentials((prev) => ({ ...prev, [name]: value }));
    }
  
    function handleSubmit(event) {
      if (credentials.password !== credentials.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      onRegister(credentials);
      event.preventDefault();
    }
  
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
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
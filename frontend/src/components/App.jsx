import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isLogin, setIsLogin] = useState(true);

  function handleLogin(credentials) {
    console.log("Logging in with:", credentials.username);
    setUser({ username: credentials.username, 
              password: credentials.password });
  }

  function handleRegister(data) {
    console.log("Registering with:", data.username);
    alert("Registration successful! Please log in.");
  }

  function handleLogout() {
    setUser(null);
    setNotes([]);
  }

  function addNote(newNote) {
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter((noteItem, index) => index !== id));
  }

  function NotesDashboard() {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <CreateNote onAdd={addNote} />
        {notes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
      </div>
    );
  }

  function toggleForm() {
    setIsLogin(!isLogin);
  }

  return (
    <div>
      <h1>Welcome to My Notes App</h1>
      {!user ? (
        <div>
          {isLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />
          )}

          <button onClick={toggleForm}>
            {isLogin ? "Need an account? Register" : "Already have an account? Log in"}
          </button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <NotesDashboard />
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // use database insted of this when backend is ready
  const [isLogin, setIsLogin] = useState(true);

  function handleLogin(credentials) {
    //once connected to backend needs to check if the credentials are valid from database
    console.log("Logged in with:", credentials.username);
    setUser({ username: credentials.username,
              password: credentials.password,
     });
  }

  function handleRegister(credentials) {
    console.log("Registered with:", credentials);
    //instead of adding to array, add to database when backend is connected
    setUsers({ credentials });
  }

  function addNote(newNote) {
    setNotes(prevNotes => {
      //add note to database later
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      //delete from database later
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function toggleForm() {
    setIsLogin(!isLogin);
  }

  return (
    <div>
      <Header />
      {!user ? (
        <div className="auth-form-container">
          {isLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />
          )}
          <button className="toggle-button" onClick={toggleForm}>
            {isLogin ? "Register Account" : "Already have an account?"}
          </button>
        </div>
      ) : (
        <div>
          <div className="welcome-container">
            <h2>Welcome, {user.username}!</h2>
          </div>
          <CreateNote onAdd={addNote}/>
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
      )}
      <Footer />
    </div>
  );
}

export default App;

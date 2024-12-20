import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { fetchNotes } from "../api";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (token && storedUser) {
      setUser(storedUser);
  
      fetchNotes(token)
        .then((fetchedNotes) => {
          setNotes(fetchedNotes);
        })
        .catch(() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user");
          setUser(null);
          setNotes([]);
        });
    } else {
      setUser(null);
      setNotes([]);
    }
  }, []);
  

  function handleLogin(credentials, data) {
    setUser(credentials);
    fetchNotes(data.token)
        .then(setNotes)
        .catch((error) => console.error("Error fetching notes after login:", error));
  }

  function handleRegister(credentials) {
    alert("Registration Successful");
    setIsLogin(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setNotes([]);
  }

  function handleDeleteAccount() {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) 
      return;
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user || !user.id) {
      console.error("User ID is missing.");
      alert("User not found. Please log in again.");
      return;
    }
  
    const userId = user.id;
    fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete account");
        }
        alert("Your account has been deleted.");
        localStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      });
  }
  
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
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
      <Header 
        user={user} 
        handleLogout={handleLogout} 
        handleDeleteAccount={handleDeleteAccount} />
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
          <CreateNote 
            onAdd={addNote}
            token={localStorage.getItem("token")}/>
          {notes.map((note, index) => (
          <Note
            key={note.id}
            id={note.id}
            localid={index}
            title={note.title}
            content={note.content}
            token={localStorage.getItem("token")}
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

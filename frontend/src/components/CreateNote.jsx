import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateNote({ onAdd, token }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        const createdNote = await response.json();
        onAdd(createdNote);
        setNote({ title: "", content: "" });
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> : null}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateNote;

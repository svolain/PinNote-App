import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note({ id, localid, title, content, token, onDelete }) {
  async function handleClick() {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDelete(localid);
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;

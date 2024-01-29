import './todoListDisplay.css';
import React, { useState } from 'react';

const TodoListDisplay = (props) => {
  const [editedText, setEditedText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [changedisplay, setchangeDisplay] = React.useState(false);

  const startEditing = (id) => {
    setEditingNoteId(id);
    setEditedText(props.notes.find(note => note.id === id)?.description || '');
  };

  const toggleDisplay = () => {
    setchangeDisplay(!changedisplay);
  };
  const updateNote = async (id,editedText) => {
    try {
      console.log(`Updated text for note with id ${id}: ${editedText}`);
      const response = await fetch(props.API_URL + `api/todoapp/UpdateNotes?id=${id}`, {
        method: "PUT",
        // body: data,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          editedText: editedText,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error updating note: ${response.status}`);
      }

      const result = await response.json();

      alert(result);
      setEditingNoteId(null); // Reset editing after updating
      setchangeDisplay(!changedisplay);
      props.refreshNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      // Handle errors as needed
    }
  };

  const deleteClick = async (id) => {
    try {
      const response = await fetch(props.API_URL + `api/todoapp/DeleteNotes?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting note: ${response.status}`);
      }

      const result = await response.json();
      alert(result);
      props.refreshNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      // Handle errors as needed
    }
  };

  return (
    <div>
      {props.notes.map(note =>
        <div key={note.id} className="topicTitle">
          <label 
          className='editedNotetitle'
          style={{ display: changedisplay ? 'none' : 'flex' }}
          >
          {editingNoteId === note.id ? editedText : note.description}
          </label>
          <input
            type='text'
            value={editingNoteId === note.id ? editedText : note.description}
            onFocus={() => startEditing(note.id)}
            onChange={(e) => setEditedText(e.target.value)}
            className='editingNotetitle'
            style={{ display: changedisplay ? 'flex' : 'none' }}
            onBlur={() => updateNote(note.id, editedText)}
          />
          <div className="topicAction">
            <button className='updateBtn' onClick={toggleDisplay}>Update Notes</button>
            {/* onClick={() => updateClick(note.id, editedText)} */}
            <button className='deleteBtn' onClick={() => deleteClick(note.id)}>Delete Notes</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoListDisplay;

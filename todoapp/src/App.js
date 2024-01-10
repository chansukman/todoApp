import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState('');

  const API_URL = "http://localhost:5038/";

  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = () => {
    fetch(API_URL + "api/todoapp/GetNotes")
      .then(response => response.json())
      .then(data => {
        setNotes(data);
      });
  };

  const addClick = async () => {
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(API_URL + "api/todoapp/AddNotes", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(result => {
        alert(result);
        refreshNotes();
      });
  };

  const deleteClick = (id) => {
    fetch(API_URL + "api/todoapp/DeleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(result => {
        alert(result);
        refreshNotes();
      });
  };

  return (
    <div className="App">
      <h2>Todo App</h2>
      <input id='newNotes' value={newNotes} onChange={(e) => setNewNotes(e.target.value)}></input>
      <button onClick={addClick}>Add Notes</button>
      {notes.map(note =>
        <p key={note.id}>
          <b>{note.description}</b>
          <button onClick={() => deleteClick(note.id)}>Delete Notes</button>
        </p>
      )}
    </div>
  );
}

export default App;

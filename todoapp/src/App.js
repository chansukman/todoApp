import React, { useState, useEffect } from 'react';
import './App.css';
import AddNote from './addNote/addNote';
import TodoListDisplay from './todoListDisplay/todoListDisplay';

const App = ()=> {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState('');
  const API_URL = "http://localhost:5038/";

  const refreshNotes = () => {
    fetch(API_URL + "api/todoapp/GetNotes")
      .then(response => response.json())
      .then(data => {
        setNotes(data);
      });
  };
    useEffect(() => {
        refreshNotes();
    }, []);


  return (
    <div className="App">
      <h2>Todo List</h2>
      <AddNote
      notes={notes}
      setNotes={setNotes}
      newNotes={newNotes}
      setNewNotes={setNewNotes}
      refreshNotes={refreshNotes}
      API_URL={API_URL}
      />
      <TodoListDisplay 
      notes={notes}
      API_URL={API_URL}
      refreshNotes={refreshNotes}
      />
     

    </div>
  );
}

export default App;

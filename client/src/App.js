import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editedNote, setEditedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:1995/notes');
      setNotes(response.data.results);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = async () => {
    if (newNote.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:1995/notes', {
        description: newNote
      });
      setNotes([...notes]);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditedNote(note);
    setNewNote(note.description);
  };

  const handleCancelEdit = () => {
    setEditedNote(null);
    setNewNote('');
  };

  const handleUpdateNote = async () => {
    if (!editedNote || newNote.trim() === '') return;

    try {
      const response = await axios.put(`http://localhost:1995/notes/${editedNote.note_id}`, {
        description: newNote
      });
      
      const updatedNotes = notes.map(note =>
        note.note_id === editedNote.note_id ? { ...note, description: response.data.results.description } : note
      );

      setNotes(updatedNotes);
      setEditedNote(null);
      setNewNote('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:1995/notes/${id}`);
      setNotes(notes.filter(note => note.note_id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Note Taking App</h1>
      
      <NoteForm
        newNote={newNote}
        handleNoteChange={handleNoteChange}
        handleAddNote={handleAddNote}
        handleUpdateNote={handleUpdateNote}
        editedNote={editedNote}
        handleCancelEdit={handleCancelEdit}
      />

      <NoteList notes={notes} handleDeleteNote={handleDeleteNote} handleEditNote={handleEditNote} />
    </div>
  );
}

export default App;

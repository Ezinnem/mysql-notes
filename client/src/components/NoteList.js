import React from 'react';

const NoteList = ({ notes, handleDeleteNote, handleEditNote }) => {
  return (
    <table className="note-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note => (
          <tr key={note.note_id}>
            <td>{note.note_id}</td>
            <td>{note.description}</td>
            <td>
              <button className="edit-button" onClick={() => handleEditNote(note)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteNote(note.note_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NoteList;

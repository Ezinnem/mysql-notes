import React from 'react';

const NoteForm = ({ newNote, handleNoteChange, handleAddNote, handleUpdateNote, editedNote, handleCancelEdit }) => {
  return (
    <div className="form-container">
      <input
        className="note-input"
        type="text"
        placeholder="Enter a new note"
        value={newNote}
        onChange={handleNoteChange}
      />
      {editedNote ? (
        <>
          <button className="update-button" onClick={handleUpdateNote}>Update</button>
          <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button className="add-button" onClick={handleAddNote}>Add Note</button>
      )}
    </div>
  );
};

export default NoteForm;

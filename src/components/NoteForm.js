import React, { useState } from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NoteForm = ({ onNoteAdded }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      setText('');
      onNoteAdded();
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        sx={{ py: 1.5 }}
      >
        Add Note
      </Button>
    </Box>
  );
};

export default NoteForm;


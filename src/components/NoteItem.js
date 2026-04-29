import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteItem = ({ note, onNotesUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const handleDelete = async () => {
    try {
      await fetch(`/api/notes/${note._id}`, { method: 'DELETE' });
      onNotesUpdate();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      await fetch(`/api/notes/${note._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editText })
      });
      setIsEditing(false);
      onNotesUpdate();
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  const formattedDate = new Date(note.createdAt).toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <Card className="note-card fade-in" sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 1.5, position: 'relative' }}>
        {isEditing ? (
          <>
            <Box component="form" onSubmit={handleUpdate} sx={{ mb: 1 }}>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ width: '100%', minHeight: '60px', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
              />
            </Box>
            <IconButton onClick={handleUpdate} size="small">
              <EditIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 1, whiteSpace: 'pre-wrap' }}>
              {note.text}
            </Typography>
            <Chip label={formattedDate} size="small" color="primary" variant="outlined" sx={{ position: 'absolute', top: 8, right: 8, fontSize: '0.75rem' }} />
            <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
              <IconButton size="small" onClick={() => setIsEditing(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteItem;


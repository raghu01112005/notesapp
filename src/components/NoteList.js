import React from 'react';
import NoteItem from './NoteItem';
import { Box } from '@mui/material';

const NoteList = ({ notes, onNotesUpdate }) => {
  return (
    <Box>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} onNotesUpdate={onNotesUpdate} />
      ))}
    </Box>
  );
};

export default NoteList;


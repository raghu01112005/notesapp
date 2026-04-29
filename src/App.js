import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { lightTheme, darkTheme } from './themes/theme';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = createTheme(darkMode ? darkTheme : lightTheme);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(note => 
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [notes, searchQuery]);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            📝 MERN Notes App
          </Typography>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Switch onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <NoteForm onNoteAdded={fetchNotes} />
        <NoteList notes={filteredNotes} onNotesUpdate={fetchNotes} />
      </Container>
    </ThemeProvider>
  );
}

export default App;


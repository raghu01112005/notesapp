<<<<<<< HEAD
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes(filteredNotes = notes) {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    filteredNotes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        noteDiv.innerHTML = `
            <p>${note.text}</p>
            <small>${note.date}</small>
            <button class="delete-btn" onclick="deleteNote(${index})">X</button>
            <button class="edit-btn" onclick="editNote(${index})">Edit</button>
        `;

        container.appendChild(noteDiv);
    });
}

function addNote() {
    const input = document.getElementById("noteInput");
    const text = input.value.trim();

    if (!text) return alert("Write something!");

    notes.push({
        text: text,
        date: new Date().toLocaleString()
    });

    input.value = "";
    saveNotes();
    displayNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

function editNote(index) {
    const newText = prompt("Edit your note:", notes[index].text);
    if (newText !== null) {
        notes[index].text = newText;
        notes[index].date = new Date().toLocaleString();
        saveNotes();
        displayNotes();
    }
}

function searchNotes() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = notes.filter(n => n.text.toLowerCase().includes(query));
    displayNotes(filtered);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

displayNotes();
=======
// Load notes when page loads
document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
    const input = document.getElementById("noteInput");
    const noteText = input.value.trim();

    if (noteText === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);

    localStorage.setItem("notes", JSON.stringify(notes));

    input.value = "";
    loadNotes();
}

function loadNotes() {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            ${note}
            <button class="delete-btn" onclick="deleteNote(${index})">X</button>
        `;

        container.appendChild(div);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}
>>>>>>> 87b8776a03118e67c3ffebeef061849007c8bace

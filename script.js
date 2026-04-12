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
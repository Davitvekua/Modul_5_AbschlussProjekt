const noteListEl = document.getElementById("noteList");
let notesArray = [];

let noteTitleEl;
let textareaEl;
let dateNote;
let noteId = 0;
let note;

function createNote(note) {
  noteListEl.innerHTML += `<div class="note-entry" id="1">
          <div class="note-title">${note.NoteTitle}</div>
          <div class="note-content-teaser">${note.NoteContent}</div>
          <div class="note-date">${new Date(note.LastUpdate).toLocaleString()}</div>
        </div>`;
}

function saveNote() {
  noteTitleEl = document.getElementById("inputTitleId").value;
  textareaEl = document.getElementById("textareaId").value;

  console.log(noteTitleEl);
  console.log(textareaEl);

  if (noteTitleEl === "" || textareaEl === "") {
    alert("Bitte Titel und Inhalt eingeben");
  } else {
    dateNote = new Date();
    noteId += 1;
    note = {
      NoteTitle: noteTitleEl,
      NoteContent: textareaEl,
      LastUpdate: dateNote.getTime(),
      Id: noteId,
    };

    notesArray.push(note);
    notesArray.sort((a, b) => {
      if (a.LastUpdate > b.LastUpdate) {
        return -1;
      } else {
        return 1;
      }
    });

    let noteFirst = notesArray[0];

    createNote(noteFirst);

    localStorage.setItem("Notes:", JSON.stringify(notesArray));
  }

  document.getElementById("inputTitleId").value = "";
  document.getElementById("textareaId").value = "";
}

function reloadRender() {
  notesArray = JSON.parse(localStorage.getItem("Notes:"));
  if (notesArray === null) {
    notesArray = [];
  }

  notesArray.sort((a, b) => {
    if (a.LastUpdate > b.LastUpdate) {
      return 1;
    } else {
      return -1;
    }
  });

  notesArray.forEach(createNote);
}

document.addEventListener("DOMContentLoaded", reloadRender);

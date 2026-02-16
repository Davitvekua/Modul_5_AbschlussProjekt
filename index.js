const noteListEl = document.getElementById("noteList");
let notesArray = [];

let noteTitleEl;
let textareaEl;
let dateNote;
let noteId = 0;
let note;
let currentId;

function createNote(note) {
  noteListEl.innerHTML += `<div class="note-entry" id="${note.id}" onclick="clickHandler('${note.id}')" >
          <div class="note-title" >${note.noteTitle}</div>
          <div class="note-content-teaser" >${note.noteContent}</div>
          <div class="note-date">${new Date(note.lastUpdate).toLocaleString()}</div>
        </div>`;
}

function saveNote() {
  noteTitleEl = document.getElementById("inputTitleId").value;
  textareaEl = document.getElementById("textareaId").value;

  if (noteTitleEl === "" || textareaEl === "") {
    alert("Bitte Titel und Inhalt eingeben");
    return;
  } else {
    dateNote = new Date();
    noteId += 1;
    note = {
      noteTitle: noteTitleEl,
      noteContent: textareaEl,
      lastUpdate: dateNote.getTime(),
      id: noteId,
    };

    notesArray.push(note);

    createNote(note);

    notesArray = notesArray.filter((removeNote) => {
      return removeNote.id !== Number(currentId);
    });

    localStorage.setItem("notes", JSON.stringify(notesArray));

    document.querySelectorAll(".selectedNote").forEach((el) => {
      el.remove();
    });
  }

  document.getElementById("inputTitleId").value = "";
  document.getElementById("textareaId").value = "";
}

function reloadRender() {
  notesArray = JSON.parse(localStorage.getItem("notes"));
  if (notesArray === null) {
    notesArray = [];
  }

  notesArray.forEach(createNote);

  if (notesArray.length === 0) {
    noteId = 0;
  } else {
    noteId = note.id;
  }
}

document.addEventListener("DOMContentLoaded", reloadRender);

// erstellen wir ein funktion, das erkennen kann auf welche element geklickt wird

function clickHandler(currentElId) {
  currentId = currentElId;
  let currentNote = document.getElementById(currentElId);
  let currentTitle = currentNote.querySelector(".note-title").innerHTML;
  let currentTeaser = currentNote.querySelector(
    ".note-content-teaser",
  ).innerHTML;

  document.getElementById("inputTitleId").value = currentTitle;
  document.getElementById("textareaId").value = currentTeaser;

  document.querySelectorAll(".selectedNote").forEach((el) => {
    el.classList.remove("selectedNote");
  });

  currentNote.classList.add("selectedNote");
}

// erstellen wir ein funktion, das markierte elemente löschen kann

function deleteNote() {
  if (currentId == null || document.getElementById(currentId) == null) {
    return;
  } else {
    document.getElementById(currentId).remove();
    notesArray = notesArray.filter((removeNote) => {
      return removeNote.id !== Number(currentId);
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
    document.getElementById("inputTitleId").value = "";
    document.getElementById("textareaId").value = "";
  }
}

function newNote() {
  document.getElementById("inputTitleId").value = "";
  document.getElementById("textareaId").value = "";
  currentId = null;
  document.querySelector(".selectedNote").classList.remove("selectedNote");
}

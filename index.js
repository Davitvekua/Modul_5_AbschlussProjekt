const noteListEl = document.getElementById("noteList");
let notesArray = [];

let noteTitleEl;
let textareaEl;
let dateNote;
let noteId = 0;
let note;
let currentId;

function createNote(note) {
  noteListEl.innerHTML += `<div class="note-entry" id="${note.Id}" onclick="clickHandler('${note.Id}')" >
          <div class="note-title" >${note.NoteTitle}</div>
          <div class="note-content-teaser" >${note.NoteContent}</div>
          <div class="note-date">${new Date(note.LastUpdate).toLocaleString()}</div>
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
      NoteTitle: noteTitleEl,
      NoteContent: textareaEl,
      LastUpdate: dateNote.getTime(),
      Id: noteId,
    };

    notesArray.push(note);

    let noteFirst = notesArray[notesArray.length - 1];

    createNote(noteFirst);

    notesArray = notesArray.filter((removeNote) => {
      return removeNote.Id !== Number(currentId);
    });

    localStorage.setItem("Notes:", JSON.stringify(notesArray));

    document.querySelectorAll(".purple").forEach((el) => {
      el.remove();
    });
  }

  document.getElementById("inputTitleId").value = "";
  document.getElementById("textareaId").value = "";
}

function reloadRender() {
  notesArray = JSON.parse(localStorage.getItem("Notes:"));
  if (notesArray === null) {
    notesArray = [];
  }

  notesArray.forEach(createNote);

  if (notesArray.length === 0) {
    noteId = 0;
  } else {
    noteId = notesArray[notesArray.length - 1].Id;
  }
}

document.addEventListener("DOMContentLoaded", reloadRender);

// erstellen wir ein funktion, das erkennen kann auf welche element geklickt wird

function clickHandler(a) {
  currentId = a;
  let currentNote = document.getElementById(a);
  let currentTitle = currentNote.querySelector(".note-title").innerHTML;
  let currentTeaser = currentNote.querySelector(
    ".note-content-teaser",
  ).innerHTML;

  document.getElementById("inputTitleId").value = currentTitle;
  document.getElementById("textareaId").value = currentTeaser;

  document.querySelectorAll(".purple").forEach((el) => {
    el.classList.remove("purple");
  });

  currentNote.classList.add("purple");
}

// erstellen wir ein funktion, das markierte elemente löschen kann

function deleteNote() {
  if (currentId == null || document.getElementById(currentId) == null) {
    return;
  } else {
    document.getElementById(currentId).remove();
    notesArray = notesArray.filter((removeNote) => {
      return removeNote.Id !== Number(currentId);
    });
    localStorage.setItem("Notes:", JSON.stringify(notesArray));
    document.getElementById("inputTitleId").value = "";
    document.getElementById("textareaId").value = "";
  }
}

function newNote() {
  document.getElementById("inputTitleId").value = "";
  document.getElementById("textareaId").value = "";
  currentId = null;

  document.querySelector(".purple").classList.remove("purple");
}

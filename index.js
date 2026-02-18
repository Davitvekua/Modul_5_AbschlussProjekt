const noteListEl = document.getElementById("noteList");
let notesArray = [];

let noteTitleEl;
let textareaEl;
let dateNote;
let noteId = 0;
let note;
let currentId;
let correntColor = "white";
let colorCurrentValue;

function createNote(note) {
  noteListEl.innerHTML += `<div class="note-entry" id="${note.Id}" onclick="clickHandler('${note.Id}')" >
          <div class="note-title" >${escapeHtml(note.NoteTitle)}</div>
          <div class="note-content-teaser" >${escapeHtml(note.NoteContent)}</div>
          <div class="note-date">${new Date(note.LastUpdate).toLocaleString()}</div>
        </div>`;

  document.getElementById(note.Id).classList.add(note.Color);
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
      Color: correntColor,
    };

    notesArray.push(note);

    let noteFirst = notesArray[notesArray.length - 1];

    createNote(noteFirst);

    notesArray = notesArray.filter((removeNote) => {
      return removeNote.Id !== Number(currentId);
    });

    localStorage.setItem("Notes", JSON.stringify(notesArray));

    document.querySelectorAll(".markedColor").forEach((el) => {
      el.remove();
    });
  }

  document.querySelectorAll(".hook").forEach((el) => {
    el.classList.add("hidden");
  });
  correntColor = "white";
  document.getElementById("inputTitleId").value = "";
  document.getElementById("textareaId").value = "";
}

function reloadRender() {
  noteListEl.innerHTML = "";

  notesArray = JSON.parse(localStorage.getItem("Notes"));
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
  document.querySelectorAll(".hook").forEach((el) => {
    el.classList.add("hidden");
  });

  currentId = a;

  let currentElColor = notesArray.find((el) => {
    return el.Id == currentId;
  }).Color;

  document
    .getElementById(currentElColor)
    .querySelector(".hook")
    .classList.remove("hidden");

  let currentNote = document.getElementById(a);
  let currentTitle = currentNote.querySelector(".note-title").innerHTML;
  let currentTeaser = currentNote.querySelector(
    ".note-content-teaser",
  ).innerHTML;

  document.getElementById("inputTitleId").value = currentTitle;
  document.getElementById("textareaId").value = currentTeaser;

  document.querySelectorAll(".markedColor").forEach((el) => {
    el.classList.remove("markedColor");
  });

  currentNote.classList.add("markedColor");
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
    localStorage.setItem("Notes", JSON.stringify(notesArray));
    document.getElementById("inputTitleId").value = "";
    document.getElementById("textareaId").value = "";
  }
}

function newNote() {
  reloadRender();
  document.getElementById("inputTitleId").value = "";
  document.getElementById("textareaId").value = "";
  currentId = null;
  document.querySelector(".markedColor").classList.remove("markedColor");
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function colorSelector(selectedElId) {
  document.querySelectorAll(".hook").forEach((el) => {
    el.classList.add("hidden");
  });
  document
    .getElementById(selectedElId)
    .querySelector(".hook")
    .classList.remove("hidden");

  correntColor = selectedElId;
  console.log(correntColor);
}

function historyColorSelector(event) {
  noteListEl.innerHTML = "";

  // colorCurrentValue = document.getElementById("selectColor").value;

  colorCurrentValue = event.target.value;

  let arrayByColor = notesArray.filter((selectNote) => {
    return selectNote.Color === colorCurrentValue;
  });

  arrayByColor.forEach(createNote);
}

document
  .getElementById("selectColor")
  .addEventListener("change", historyColorSelector);

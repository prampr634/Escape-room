let inventory = [];
let mathSolved = false;
let teacherClue = false;
let bookSolved = false;

// ROOM SWITCHING
function goRoom(room) {
  document.querySelectorAll(".room").forEach(r => r.classList.remove("active"));
  document.getElementById(room).classList.add("active");
}

// INVENTORY
function updateInventory() {
  document.getElementById("items").innerText = inventory.join(", ");
}

function getItem(item) {
  if (!inventory.includes(item)) {
    inventory.push(item);
    showPopup("You found: " + item);
    updateInventory();
  }
}

// POPUP SYSTEM
function showPopup(text) {
  const popup = document.getElementById("popup");
  popup.innerText = text;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

// PUZZLE 1: MATH POSTER
function solveMath() {
  let ans = prompt("Solve: 7 × 6 = ?");
  if (ans === "42") {
    mathSolved = true;
    showPopup("Correct! Locker code hint: 4");
  } else {
    showPopup("Wrong answer!");
  }
}

// NPC TEACHER
function talkTeacher() {
  teacherClue = true;
  showPopup("Teacher: 'The library knows everything...'");
}

// LOCKER PUZZLE
function openLocker() {
  let code = prompt("Enter 3-digit locker code:");
  if (code === "421") {
    getItem("key");
  } else {
    showPopup("Incorrect code");
  }
}

// LIBRARY PUZZLE
function libraryPuzzle() {
  if (teacherClue) {
    bookSolved = true;
    showPopup("Books reveal word: LAB");
  } else {
    showPopup("Nothing makes sense yet...");
  }
}

// END GAME
function escape() {
  if (inventory.includes("key") && bookSolved) {
    showPopup("YOU ESCAPED... but this school was an experiment.");
  } else {
    showPopup("Door is locked. You need more clues.");
  }
}

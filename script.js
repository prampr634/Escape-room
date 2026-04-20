let inventory = [];
let mathSolved = false;
let teacherClue = false;
let lockerKey = false;
let librarySolved = false;

// ROOM SWITCH
function goRoom(room) {
  document.querySelectorAll(".room").forEach(r => r.classList.remove("active"));
  document.getElementById(room).classList.add("active");
}

// POPUP
function popup(text) {
  let p = document.getElementById("popup");
  p.innerText = text;
  p.style.display = "block";

  setTimeout(() => {
    p.style.display = "none";
  }, 2000);
}

// INVENTORY UPDATE
function updateInventory() {
  document.getElementById("inventory").innerText =
    inventory.join(", ") || "Empty";
}

// 🧠 PUZZLES
function mathPuzzle() {
  let a = prompt("6 × 7 = ?");
  if (a === "42") {
    mathSolved = true;
    popup("Correct! Something unlocked...");
  } else {
    popup("Wrong!");
  }
}

function teacher() {
  teacherClue = true;
  popup("Teacher: 'The library knows everything...'");
}

function openLocker() {
  if (!mathSolved) {
    popup("Solve math first.");
    return;
  }

  let code = prompt("Enter locker code:");
  if (code === "421") {
    inventory.push("key");
    lockerKey = true;
    updateInventory();
    popup("You found a key!");
  } else {
    popup("Wrong code.");
  }
}

function libraryPuzzle() {
  let a = prompt("2, 4, 8, 16, ?");
  if (a === "32") {
    librarySolved = true;
    popup("Library puzzle solved!");
  } else {
    popup("Think pattern.");
  }
}

// 🚨 ENDING 1
function escape() {
  if (inventory.includes("key") && librarySolved) {
    goRoom("secret");
  } else {
    popup("Door locked.");
  }
}

// 🏁 FINAL ENDING
function escapeFinal() {
  if (mathSolved && librarySolved && inventory.includes("key")) {
    popup("🟢 TRUE ENDING: You escaped AND uncovered the experiment!");
  } else {
    popup("🔴 BAD ENDING: You are trapped forever.");
  }
}

// INIT
updateInventory();

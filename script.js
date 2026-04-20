let state;

// 🎮 INIT GAME
function startGame() {
  state = {
    inventory: [],
    flags: {
      math: false,
      locker: false,
      library: false
    },
    room: "classroom"
  };

  switchScreen("game");
  render();
}

// 🔄 SCREEN SWITCH
function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// 🎮 ROOM DATA
const rooms = {
  classroom: {
    title: "Classroom",
    items: [
      { text: "📊 Solve Math", action: mathPuzzle },
      { text: "🚪 Hallway", action: () => changeRoom("hallway") }
    ]
  },

  hallway: {
    title: "Hallway",
    items: [
      { text: "🧑‍🏫 Teacher", action: teacher },
      { text: "🔒 Lockers", action: () => changeRoom("lockers") }
    ]
  },

  lockers: {
    title: "Lockers",
    items: [
      { text: "🔐 Open Locker", action: locker },
      { text: "📚 Library", action: () => changeRoom("library") }
    ]
  },

  library: {
    title: "Library",
    items: [
      { text: "📖 Pattern Puzzle", action: library },
      { text: "🚪 Exit Door", action: escape }
    ]
  }
};

// 🚪 ROOM CHANGE
function changeRoom(r) {
  state.room = r;
  render();
}

// 🎨 RENDER ROOM
function render() {
  let room = rooms[state.room];

  document.getElementById("room-title").innerText = room.title;

  let html = "";
  room.items.forEach(i => {
    html += `<div class="item" onclick="i.action()">${i.text}</div>`;
  });

  document.getElementById("room-content").innerHTML = html;

  document.getElementById("inventory").innerText =
    state.inventory.join(", ") || "Empty";

  document.getElementById("status").innerText =
    "Explore the school...";
}

// 🧠 PUZZLES
function mathPuzzle() {
  let a = prompt("6 × 7 = ?");
  if (a === "42") {
    state.flags.math = true;
    alert("Correct!");
  } else {
    alert("Wrong");
  }
}

function teacher() {
  alert("Teacher: Something is hidden in the library...");
}

function locker() {
  if (!state.flags.math) {
    alert("Solve math first");
    return;
  }

  let code = prompt("Enter code:");
  if (code === "421") {
    state.inventory.push("key");
    alert("You got a key!");
  } else {
    alert("Wrong code");
  }
}

function library() {
  let a = prompt("2,4,8,16,?");
  if (a === "32") {
    state.flags.library = true;
    alert("Library solved");
  } else {
    alert("Think pattern");
  }
}

// 🏁 ENDINGS
function escape() {
  if (state.flags.math && state.flags.library && state.inventory.includes("key")) {
    switchScreen("win");
  } else {
    switchScreen("lose");
  }
}

// 🔁 RESTART
function restart() {
  switchScreen("menu");
}

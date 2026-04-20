let state = {
  room: "classroom",
  inventory: [],
  flags: {
    math: false,
    locker: false,
    library: false
  }
};

/* 🗺️ MAP SYSTEM */
function openMap() {
  switchScreen("mapScreen");
}

function startGame() {
  switchScreen("gameScreen");
  enterRoom("classroom");
}

/* SCREEN SWITCH */
function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* 🚪 ROOM SYSTEM (CINEMATIC) */
function enterRoom(room) {
  let fade = document.getElementById("fade");
  fade.style.opacity = 1;

  setTimeout(() => {
    state.room = room;
    renderRoom();

    fade.style.opacity = 0;
    switchScreen("gameScreen");
  }, 300);
}

/* 🎮 RENDER ROOM */
function renderRoom() {
  const rooms = {
    classroom: {
      title: "Classroom",
      items: [
        { text: "📊 Math Puzzle", action: mathPuzzle },
        { text: "➡ Hallway", action: () => enterRoom("hallway") }
      ]
    },

    hallway: {
      title: "Hallway",
      items: [
        { text: "🧑‍🏫 Talk Teacher", action: teacher },
        { text: "🔒 Lockers", action: () => enterRoom("lockers") }
      ]
    },

    lockers: {
      title: "Lockers",
      items: [
        { text: "🔐 Open Locker", action: locker },
        { text: "📚 Library", action: () => enterRoom("library") }
      ]
    },

    library: {
      title: "Library",
      items: [
        { text: "📖 Pattern Puzzle", action: library },
        { text: "🚪 Exit", action: escape }
      ]
    }
  };

  let room = rooms[state.room];

  document.getElementById("room-title").innerText = room.title;

  let html = "";

  room.items.forEach((item, i) => {
    html += `<div class="item" onclick="runAction(${i})">${item.text}</div>`;
  });

  document.getElementById("room-content").innerHTML = html;

  window.currentItems = room.items;
}

/* ⚙️ ACTION RUNNER */
function runAction(index) {
  window.currentItems[index].action();
  renderRoom();
}

/* 💬 DIALOGUE SYSTEM (REAL GAME STYLE) */
function say(text) {
  let box = document.getElementById("dialogueBox");
  box.innerText = text;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 2000);
}

/* 🧠 PUZZLES */
function mathPuzzle() {
  let a = prompt("6 × 7 = ?");
  if (a === "42") {
    state.flags.math = true;
    say("Math solved. Locker unlocked.");
  } else {
    say("Wrong.");
  }
}

function teacher() {
  say("Teacher: Something is hidden in the library...");
}

function locker() {
  if (!state.flags.math) {
    say("Solve math first.");
    return;
  }

  let code = prompt("Enter code:");
  if (code === "421") {
    state.inventory.push("key");
    say("You got a key!");
  } else {
    say("Wrong code.");
  }
}

function library() {
  let a = prompt("2, 4, 8, 16, ?");
  if (a === "32") {
    state.flags.library = true;
    say("Library puzzle solved.");
  } else {
    say("Think pattern.");
  }
}

/* 🏁 ENDING */
function escape() {
  if (state.flags.math && state.flags.library && state.inventory.includes("key")) {
    say("🟢 TRUE ENDING: You escaped and uncovered the truth.");
  } else {
    say("🔴 Locked. You are trapped.");
  }
}

/* INIT */
renderRoom();

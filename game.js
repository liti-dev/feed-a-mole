let runAgainAt = Date.now() + 100;
let score = 0;
document.querySelector(".bg").addEventListener("click", feed);
document.querySelector(".restart-btn").addEventListener("click", restart);

// random time periods for mole's actions
function getSadOrLeaveInterval() {
  return Date.now() + Math.floor(Math.random() * 2000 + 2000);
}
function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 3000 + 5000);
}
function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000 + 4000);
}

const moles = [
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-0"),
  },
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-1"),
  },
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-2"),
  },
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-3"),
  },
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-4"),
  },
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-5"),
  },
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-6"),
  },
  {
    status: "sad",
    next: getSadOrLeaveInterval(),
    king: false,
    node: document.querySelector("#hole-7"),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadOrLeaveInterval();
      mole.status = "leaving";
      mole.node.children[0].src = "./assets/mole-leaving.png";
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      mole.node.children[0].src = "./assets/mole-hungry.png";
      break;
    case "hungry":
      mole.status = "sad";
      mole.next = getSadOrLeaveInterval();
      mole.node.children[0].classList.remove("hungry");
      mole.node.children[0].src = "./assets/mole-sad.png";
      break;
  }
}

function feed(event) {
  if (
    event.target.tagName !== "IMG" ||
    !event.target.classList.contains("hungry")
  ) {
    return;
  }
  const mole = moles[parseInt(event.target.dataset.index)];
  mole.status = "fed";
  mole.next = getSadOrLeaveInterval();
  mole.node.children[0].src = "./assets/mole-fed.png";
  mole.node.children[0].classList.remove("hungry");
  score++;
  document.querySelector(".score-container").style.width = `${score * 10}%`;

  if (score >= 10) {
    win();
  }
}

function win() {
  document.querySelector(".bg").classList.add("gone");
  document.querySelector(".win").classList.remove("gone");
  document.querySelector(".restart-btn").classList.remove("gone");
}

function restart() {
  location.reload();
}

function nextFrame() {
  const now = Date.now();
  if (now >= runAgainAt) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}

nextFrame();

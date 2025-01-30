
const pump_handle = document.querySelector("#pumpHandle img");
const pump_box = document.querySelector("#pumpBox");
const parentElement = document.querySelector(".parent");
const firstballoon = document.querySelector("#initialBalloon");
const div4 = document.querySelector(".div4");

const balloonColors = ["blue", "cyan", "green", "magenta", "orange2", "pink", "purple", "red", "violet", "yellow"];
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const createNewBalloon = () => {
  console.log("Creating new balloon...");
  const randomColor = getRandomItem(balloonColors);
  const randomAlphabet = getRandomItem(alphabets);

  const newBalloon = document.createElement("div");
  newBalloon.id = "nextBalloon";
  newBalloon.innerHTML = `
      <img src="Graphics/Balloon_${randomColor}.png" id="firstballoon" alt="">
      <img src="Graphics/${randomAlphabet}.png" alt="Alphabet" class="alphabet-image">
    `;
  newBalloon.style.transform = "translateX(20%) translateY(4%) scale(0.3)";
  console.log("New balloon created:", newBalloon);
  return newBalloon;
};

let clickCount = 0;
let scale = 0.3;
const clickToInflate = (balloon) => {
  console.log("Pump handle clicked");
  console.log("Balloon:", balloon, "Click count:", clickCount);
  clickCount++;

  pump_handle.classList.add("move-down");
  pump_box.classList.add("expandBox");

  if (clickCount < 5) {
    if (scale < 1.1) {
      balloon.style.transform = `translateX(20%) translateY(4%) scale(${scale})`;
      scale += 0.2;
      console.log("Scale:", scale);
    }
  }

  if (clickCount >= 5) {
    flyAndRound(balloon);
    removePumpClickListener(balloon);

    const newBalloon = createNewBalloon();
    console.log("Attempting to append new balloon to parent");
    if (parentElement) {
      parentElement.appendChild(newBalloon);
      console.log("New balloon appended successfully");
      handlePumpClick(newBalloon);
      clickCount = 0;
      scale = 0.3;
    } else {
      console.error("Parent element not found");
    }
  }

  setTimeout(() => {
    pump_handle.classList.remove("move-down");
    pump_box.classList.remove("expandBox");
  }, 200);

  console.log("Click count:", clickCount);
};

const handlePumpClick = (balloon) => {
  const inflateBalloon = () => clickToInflate(balloon);
  pump_handle.addEventListener("click", inflateBalloon);
  balloon.inflateListener = inflateBalloon;
};

const removePumpClickListener = (balloon) => {
  if (balloon.inflateListener) {
    pump_handle.removeEventListener("click", balloon.inflateListener);
  }
};

handlePumpClick(firstballoon);
console.log("Parent element:", parentElement);

function flyAndRound(balloon) {
  console.log("Adding click event to balloon");
  balloon.style.cursor = "pointer";
  balloon.style.animation = "flyToCorner 5s linear forwards";
  balloon.classList.add("flying-balloon");

  balloon.addEventListener("click", () => {
    console.log("Balloon clicked, popping...");
    popBalloon(balloon);
  });
}

function popBalloon(balloon) {
  console.log("Popping balloon");
  

  setTimeout(() => {
    balloon.style.display = "none";
    balloon.style.cursor = "pointer";
    balloon.style.animation = "none";}, 100);
  
}
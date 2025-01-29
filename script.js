const pump_handle = document.querySelector("#pumpHandle img")
const pump_box = document.querySelector("#pumpBox")
const parentElement = document.querySelector(".parent")
const firstballoon = document.querySelector("#initialBalloon")
const div4 = document.querySelector(".div4")

const balloonColors = ["blue", "cyan", "green", "magenta", "orange2", "pink", "purple", "red", "violet", "yellow"]
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)]

// Function to create a new balloon
const createNewBalloon = () => {
  console.log("Creating new balloon...")
  const randomColor = getRandomItem(balloonColors)
  const randomAlphabet = getRandomItem(alphabets)

  const newBalloon = document.createElement("div")
  newBalloon.id = "nextBalloon"
  newBalloon.innerHTML = `
      <img src="Graphics/Balloon_${randomColor}.png" id="firstballoon" alt="">
      <img src="Graphics/${randomAlphabet}.png" alt="Alphabet" class="alphabet-image">
    `
  newBalloon.style.transform = "translateX(20%) translateY(4%) scale(0.3)"
  console.log("New balloon created:", newBalloon)
  return newBalloon
}

// Function to handle the pump click event
let clickCount = 0
let scale = 0.3
const clickToInflate = (balloon) => {
  console.log("Pump handle clicked")
  console.log("Balloon:", balloon, "Click count:", clickCount)
  clickCount++

  // Animate pump handle and box
  pump_handle.classList.add("move-down")
  pump_box.classList.add("expandBox")

  if (clickCount < 5) {
    if (scale < 1.1) {
      balloon.style.transform = `translateX(20%) translateY(4%) scale(${scale})`
      scale += 0.2
      console.log("Scale:", scale)
    }
  }

  if (clickCount >= 5) {
    // Apply the flyToTopLeft animation directly
    balloon.style.animation = "flyToTopLeft 2s ease-in-out forwards"

    // Remove the event listener from the current balloon
    removePumpClickListener(balloon)

    // Create and add a new balloon after the current one flies away
    setTimeout(() => {
      const newBalloon = createNewBalloon()
      console.log("Attempting to append new balloon to parent")
      if (parentElement) {
        parentElement.appendChild(newBalloon)
        console.log("New balloon appended successfully")
        handlePumpClick(newBalloon)
        clickCount = 0
        scale = 0.3
      } else {
        console.error("Parent element not found")
      }
    }, 2000) // Wait for 2 seconds (duration of the flyToTopLeft animation)
  }

  // Reset pump handle animation after a short delay
  setTimeout(() => {
    pump_handle.classList.remove("move-down")
    pump_box.classList.remove("expandBox")
  }, 200)

  console.log("Click count:", clickCount)
}

// Function to add click event to the pump handle
const handlePumpClick = (balloon) => {
  const inflateBalloon = () => clickToInflate(balloon)
  pump_handle.addEventListener("click", inflateBalloon)

  // Store the event listener function on the balloon element
  balloon.inflateListener = inflateBalloon
}

const removePumpClickListener = (balloon) => {
  if (balloon.inflateListener) {
    pump_handle.removeEventListener("click", balloon.inflateListener)
  }
}

// Initialize the event listener with the first balloon
handlePumpClick(firstballoon)

// Log the parent element to check if it's correctly selected
console.log("Parent element:", parentElement)


const pump_handle = document.querySelector("#pumpHandle img")
const pump_box = document.querySelector("#pumpBox")
const parentElement = document.querySelector(".parent")
const firstballoon = document.querySelector("#initialBalloon")

// Balloon colors and alphabets (for possible future use)
const balloonColors = ["blue", "cyan", "green", "magenta", "orange2", "pink", "purple", "red", "violet", "yellow"]
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

// Function to handle the pump click event
let clickCount = 0
let scale = 0.3
const clickToInflate = (balloon) => {
  console.log("Pump handle clicked")
  console.log("Balloon:", balloon , "Click count:", clickCount)
  clickCount++

  // Animate pump handle and box
  pump_handle.classList.add("move-down")
  pump_box.classList.add("expandBox")

  if (clickCount < 5) {
    if (scale < 1.1) {
    balloon.style.transform = `translateX(20%) translateY(4%) scale(${scale})`
    scale += 0.2
    console.log("Scale:", scale)
  }}

  if (clickCount>=5) {
    // Apply the flyToTopLeft animation directly
    balloon.style.animation = "flyToTopLeft 2s ease-in-out forwards"
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
  pump_handle.addEventListener("click", () => clickToInflate(balloon))
}

// Initialize the event listener with the first balloon
handlePumpClick(firstballoon)


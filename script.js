let clickCount = 0
const pump_handle = document.querySelector("#pumpHandle img")
const pump_box=document.querySelector("#pumpBox")
const parentElement = document.querySelector(".parent")
const firstballoon=document.querySelector("#initialBalloon" )
let scale=0.5



// /*For randomlyl getting colored ballon and alphabets*/
const balloonColors = ["blue", "cyan", "green", "magenta", "orange2", "pink", "purple", "red", "violet", "yellow"]
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

console.log(pump_handle)

//Function 1 - onclick the handle moves up and down and box pops also
//pump handle click event
pump_handle.addEventListener("click", () => {
    console.log("Pump handle clicked");
    console.log(firstballoon.style.transform)
    clickCount++
    pump_handle.classList.add("move-down");
    pump_box.classList.add("expandBox");
    if (clickCount<5) {
        firstballoon.style.transform= `translateX(20%) translateY(4%) scale(${scale})`
        scale += 0.2
        console.log(scale)
    }

    
    

        setTimeout(() => {
            console.log("Removing move-down class");
            pump_handle.classList.remove("move-down");
            pump_box.classList.remove("expandBox");
        }, 200);
    
});
 





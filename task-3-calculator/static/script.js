// Sound Effects
const clickSound = new Audio("static/sounds/click.mp3");
const deleteSound = new Audio("static/sounds/delete.mp3");
const resetSound = new Audio("static/sounds/reset.mp3");

clickSound.volume = 0.7;
deleteSound.volume = 0.3;
resetSound.volume = 0.3;

// Selecting the display screen and all calculator buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

// Click Event Listener for Buttons
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.getAttribute("data-value");

    if (value === "AC") {
      resetSound.currentTime = 0;
      resetSound.play();
      currentInput = "";
      display.textContent = "0";
    } else if (value === "DEL") {
      deleteSound.currentTime = 0;
      deleteSound.play();
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
    } else if (value === "=") {
      clickSound.currentTime = 0;
      clickSound.play();
      try {
        const result = eval(currentInput); // safe here because input only comes from buttons
        display.textContent = result;
        currentInput = result.toString();
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    } else {
      clickSound.currentTime = 0;
      clickSound.play();
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});

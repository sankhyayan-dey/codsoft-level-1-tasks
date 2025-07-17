// Sound Effects
const clickSound = new Audio("static/sounds/click.mp3");
const deleteSound = new Audio("static/sounds/delete.mp3");
const resetSound = new Audio("static/sounds/reset.mp3");

clickSound.volume = 0.7;
deleteSound.volume = 0.7;
resetSound.volume = 0.7;

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

// Keyboard Event Listener
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const allowedKeys = /[\d\+\-\*\/\.]/;

  // Highlight visual feedback
  highlightButton(key);

  if (allowedKeys.test(key)) {
    clickSound.currentTime = 0;
    clickSound.play();
    currentInput += key;
    display.textContent = currentInput;
  } else if (key === "Enter") {
    event.preventDefault();
    clickSound.currentTime = 0;
    clickSound.play();
    try {
      const result = eval(currentInput);
      display.textContent = result;
      currentInput = result.toString();
    } catch {
      display.textContent = "Error";
      currentInput = "";
    }
  } else if (key === "Backspace") {
    deleteSound.currentTime = 0;
    deleteSound.play();
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || "0";
  } else if (key === "Escape") {
    resetSound.currentTime = 0;
    resetSound.play();
    currentInput = "";
    display.textContent = "0";
  }
});

// Optional: Visual highlight effect for keyboard keys
function highlightButton(key) {
  let selector = `[data-value="${key}"]`;

  // Map keyboard keys to button data-values
  if (key === "Enter") selector = `[data-value="="]`;
  if (key === "Escape") selector = `[data-value="AC"]`;
  if (key === "Backspace") selector = `[data-value="DEL"]`;
  if (key === "*") selector = `[data-value="*"]`;
  if (key === "/") selector = `[data-value="/"]`;

  const btn = document.querySelector(selector);
  if (btn) {
    btn.classList.add("active"); // Add highlight class
    setTimeout(() => btn.classList.remove("active"), 150); // Remove after 150ms
  }
}

// Theme Switching
const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.getAttribute("data-theme");
    document.documentElement.className = ""; // Clear all previous themes
    document.documentElement.classList.add(theme);
  });
});

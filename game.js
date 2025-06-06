// Initialize the score variable
let score = 0;

// Get references to DOM elements for score display and buttons
const scoreDisplay = document.getElementById("score");
const clickBtn = document.getElementById("clickBtn");
const doubleClickBtn = document.getElementById("doubleClickBtn");

// Function to update the displayed score on the page
function updateScoreDisplay() {
  scoreDisplay.textContent = "Score: " + score;
}

// Function to create a floating "+1" or "+2" text at the mouse click position
function createFloatingText(text, x, y) {
  const floatText = document.createElement("div");
  floatText.className = "floating-text"; // CSS class for animation
  floatText.textContent = text;
  document.body.appendChild(floatText);

  // Position the floating text near the mouse click coordinates
  floatText.style.left = x + "px";
  floatText.style.top = y + "px";

  // Remove the floating text after 1 second to clean up the DOM
  setTimeout(() => {
    floatText.remove();
  }, 1000);
}

// Event listener for the single click button
clickBtn.addEventListener("click", (e) => {
  score += 1; // Increase score by 1
  updateScoreDisplay(); // Update score on page
  createFloatingText("+1", e.clientX, e.clientY); // Show floating "+1" animation
});

// Event listener for the double click button
doubleClickBtn.addEventListener("click", (e) => {
  score += 2; // Increase score by 2
  updateScoreDisplay(); // Update score on page
  createFloatingText("+2", e.clientX, e.clientY); // Show floating "+2" animation
});

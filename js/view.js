const view = {
  scoreDisplay: document.getElementById("score"),
  clickBtn: document.getElementById("clickBtn"),
  doubleClickBtn: document.getElementById("doubleClickBtn"),
  resetBtn: document.getElementById("resetBtn"),

  updateScoreDisplay(score) {
    this.scoreDisplay.textContent = "Score: " + score;
  },

  createFloatingText(text, x, y) {
    const floatText = document.createElement("div");
    floatText.className = "floating-text";
    floatText.textContent = text;
    floatText.style.left = `${x}px`;
    floatText.style.top = `${y}px`;
    document.body.appendChild(floatText);

    setTimeout(() => {
      floatText.remove();
    }, 1000);
  },
};

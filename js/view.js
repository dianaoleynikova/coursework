export class GameView {
  constructor() {
    this.scoreDisplay = document.getElementById("score");
    this.clickButton = document.getElementById("clickBtn");
    this.upgradeButton = document.getElementById("upgradeClick");
  }

  // Update the score text
  updateScore(score, clickPower) {
    this.scoreDisplay.textContent = `Score: ${score} (Click Power: ${clickPower})`;
  }

  // Show floating "+1", "+2" etc animation on click
  showClickAnimation(text) {
    const anim = document.createElement("div");
    anim.textContent = text;
    anim.className = "click-animation";

    // Random horizontal position near center (to avoid overlap)
    anim.style.left = `${50 + (Math.random() * 40 - 20)}%`;
    anim.style.top = "50%";

    document.body.appendChild(anim);

    // Remove animation div after animation ends (0.8s)
    setTimeout(() => anim.remove(), 800);
  }
}

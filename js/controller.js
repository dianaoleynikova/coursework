import { GameModel } from "./model.js";
import { GameView } from "./view.js";

export class GameController {
  constructor() {
    this.model = new GameModel();
    this.view = new GameView();
  }

  init() {
    // Update view when score changes
    this.model.addObserver((score) => {
      this.view.updateScore(score, this.model.getClickPower());
    });

    // Handle main click button
    this.view.clickButton.addEventListener("click", () => {
      this.model.incrementScore();
      this.view.showClickAnimation(`+${this.model.getClickPower()}`);
    });

    // Handle upgrade button
    this.view.upgradeButton.addEventListener("click", () => {
      this.model.upgradeClick();
    });

    // Initial UI update
    this.view.updateScore(this.model.getScore(), this.model.getClickPower());
  }
}

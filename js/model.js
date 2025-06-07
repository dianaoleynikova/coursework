export class GameModel {
  constructor() {
    this.score = 0;
    this.clickPower = 1;
    this.observers = [];
  }

  // Subscribe to score changes
  addObserver(callback) {
    this.observers.push(callback);
  }

  // Notify UI about changes
  notifyObservers() {
    for (const cb of this.observers) {
      cb(this.score);
    }
  }

  // Increase score by clickPower
  incrementScore() {
    this.score += this.clickPower;
    this.notifyObservers();
  }

  // Double clickPower and notify
  upgradeClick() {
    this.clickPower *= 2;
    this.notifyObservers();
  }

  getScore() {
    return this.score;
  }

  getClickPower() {
    return this.clickPower;
  }
}

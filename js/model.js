const model = {
  score: 0,

  increaseScore(amount) {
    this.score += amount;
  },

  resetScore() {
    this.score = 0;
  },

  getScore() {
    return this.score;
  },
};

const controller = {
  init() {
    view.clickBtn.addEventListener("click", (e) => {
      model.increaseScore(1);
      view.updateScoreDisplay(model.getScore());
      view.createFloatingText("+1", e.clientX, e.clientY);
    });

    view.doubleClickBtn.addEventListener("click", (e) => {
      model.increaseScore(2);
      view.updateScoreDisplay(model.getScore());
      view.createFloatingText("+2", e.clientX, e.clientY);
    });

    view.resetBtn.addEventListener("click", () => {
      model.resetScore();
      view.updateScoreDisplay(model.getScore());
    });

    // Початковий показ рахунку
    view.updateScoreDisplay(model.getScore());
  },
};

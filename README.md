# Clicker Game

This is a simple clicker game built with JavaScript, HTML, and CSS using the MVC pattern.

---

## Project Structure

- **main.js** – initializes the game by creating a `GameController` instance and starting the game.
- **controller.js** – connects the model and the view, handles user interactions.
- **model.js** – holds the game state (score, click power), and logic for updating it.
- **view.js** – manages the user interface, updating the score display, click animations, and the scoreboard including a playtime timer.

---

## Features

- Increment score by clicking the main button.
- Upgrade click power to increase points gained per click.
- Scoreboard shows current score, click power, and elapsed playtime.
- Floating click animations display the amount gained on each click.
- Timer shows how long the game has been played since start.

---

## How to Run

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Click the **Click me** button to increase your score.
4. Use **Upgrade Click** button to double your click power.
5. Watch the scoreboard update with score, click power, and elapsed time.

---

## Code Highlights

- **MVC Pattern:**  
  The code is organized using the Model-View-Controller pattern to separate concerns:  
  - Model manages data and logic (score, upgrades).  
  - View handles UI rendering and animations.  
  - Controller connects Model and View, listening for user input and updating the game.

- **Observer Pattern:**  
  The model notifies subscribed observers whenever the score or click power changes, ensuring the view updates reactively.

- **Scoreboard with Timer:**  
  The scoreboard dynamically displays the current score, click power, and a timer showing elapsed game time formatted as minutes and seconds.

---

## Technologies Used

- Vanilla JavaScript (ES6 modules)
- HTML5
- CSS3

---

## File Overview

### main.js

Starts the game by creating the controller instance and calling `init()`.

### controller.js

- Instantiates model and view.
- Subscribes to model changes and updates the view.
- Listens to button clicks and triggers model updates.

### model.js

- Keeps track of score and click power.
- Provides methods to increment score and upgrade click power.
- Notifies observers about changes.

### view.js

- Updates the score and click power display.
- Shows floating animations for clicks.
- Maintains and updates the scoreboard including the timer.

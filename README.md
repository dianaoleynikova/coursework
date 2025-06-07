# Clicker Game

A simple clicker game built with JavaScript using MVC architecture. This project demonstrates basic game logic, UI updates, and event handling with clean separation of concerns.

## Features

- Click the "Click me" button to increase your score.
- Upgrade your click power with the "Upgrade Click" button (doubles the click power).
- Score updates dynamically on the screen.
- Animated "+N" effect on each click.
- Uses Observer pattern to update the UI when the score changes.
- Code is organized following the Model-View-Controller (MVC) pattern.

## Technologies Used

- JavaScript (ES6 modules)
- HTML5
- CSS3

## File Structure

- `index.html` — Main HTML file containing buttons and score display.
- `style.css` — Styles for centering buttons and animation effects.
- `js/`
  - `model.js` — Contains game logic and state management.
  - `view.js` — Handles UI updates and animations.
  - `controller.js` — Connects model and view, handles user input.
  - `main.js` — Initializes the game controller.

## How to Run

1. Clone the repository or download the files.
2. Open `index.html` in a modern browser (supporting ES6 modules).
3. Click "Click me" to increase score.
4. Click "Upgrade Click" to double the points earned per click.

## Explanation

- The **Model** stores the game state (`score`, `clickPower`) and notifies observers on changes.
- The **View** updates the DOM elements to show the current score and animations.
- The **Controller** binds UI events (button clicks) to model updates and triggers view updates.
- The Observer pattern is used for the model to notify the view about score changes, ensuring a clean separation.

## Notes

- The project uses ES6 modules, so it needs to be served via a local server or opened in a browser that supports modules via the file system.
- Styling centers the buttons and the score display on the screen.
- Animations show floating "+N" text on each click.

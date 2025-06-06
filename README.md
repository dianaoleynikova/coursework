# Clicker Game (MVC Architecture)

This is a simple browser-based clicker game built using the MVC (Model-View-Controller) design pattern.  
Players click buttons to increase their score, with floating text animations appearing at the click location.

## Folder Structure
coursework/
├── index.html
├── style.css
├── GS/
│   ├── model.js
│   ├── view.js
│   ├── controller.js
│   └── main.js
└── .gitignore
## How to Play

- Click the "+1" button to increase your score by 1.
- Click the "+2" button to increase your score by 2.
- A floating "+1" or "+2" text appears where you click.

## Architecture Overview

This project follows the MVC pattern:

- **Model** – Manages the game data and logic (e.g., the score).
- **View** – Handles all updates to the page and visual effects.
- **Controller** – Responds to user actions and coordinates between model and view.
- **Main** – Initializes and starts the game.

## How to Run

1. Open `index.html` in your browser.
2. Make sure the `GS` folder with JavaScript files is in the same directory.

## Technologies Used

- HTML
- CSS
- JavaScript (modular files using MVC pattern)

## Best Practices

- `.DS_Store` files are ignored using `.gitignore` (for macOS users).
- Code is modular and separated by responsibility for better readability and maintainability.

# Chess V2 - React

Welcome to the Chess V2 React application! This project is a chess game built with React and TypeScript, designed for a fun and interactive chess-playing experience. Below you will find information on the structure of the project, how to get started, and an overview of the key features.

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Features](#features)

## About the Project

Chess V2 is a chess game built with modern technologies such as React, TypeScript, and Vite for bundling. The app supports a clean and interactive user interface for a chess-playing experience, featuring a comprehensive chess logic backend that manages the rules and movements of all pieces.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shlomiNugarker/Chess-V2-React
   cd chess-v2-react-main
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

   This will start a local development server where you can view the app.

## Project Structure

The project is structured as follows:

```
chess-v2-react-main/
├── public/                 # Public assets, such as favicon
├── src/                    # Source code for the application
│   ├── assets/             # SCSS files for styling
│   │   ├── scss/           # Global SCSS styles and component styles
│   ├── components/         # React components, including game board, chat, etc.
│   ├── services/           # Game logic, services for managing piece movement and rules
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Files and folders to ignore in Git
├── index.html              # Main HTML file
├── jest.config.ts          # Jest configuration for testing
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration for bundling
└── README.md               # Project documentation
```

## Scripts

The following scripts are available in the `package.json`:

- **`npm run dev`**: Runs the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run lint`**: Runs ESLint to check code quality.

## Dependencies

Key dependencies used in this project:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript, enhancing code reliability.
- **Vite**: Fast build tool for modern web development.
- **SCSS**: Preprocessor for enhanced styling capabilities.

## Features

- **Interactive Chess Board**: A fully functional chessboard that allows players to make moves.
- **Comprehensive Game Logic**: Handles all chess rules, including special moves like castling, en passant, and promotion.
- **Clean UI Design**: Styled with SCSS for a responsive and visually appealing interface.
- **Modular Components**: Easy to maintain and extend due to the separation of logic and components.

---

Feel free to contribute, report issues, or provide suggestions for improvements! Enjoy playing Chess V2!


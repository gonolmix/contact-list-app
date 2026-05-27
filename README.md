# Contacts App

## Features

### Functional Requirements
*   **Contact List:** Displays a list of contacts showing Avatar, Name, and Phone.
*   **Add Contact:** Form with validation to prevent empty fields and duplicate entries (matching name and phone).
*   **Inline Edit:** Ability to edit contact details directly in the list.
*   **Delete:** Ability to delete contacts with a confirmation prompt.
*   **Search:** Real-time, case-insensitive search by name and phone number.

### Technical Requirements
*   Built with **React 18+** using **Vite**.
*   Uses **JSX**.
*   State management via `useState` hooks.
*   **CSS Modules** used for isolated component styles.
*   **ESLint** configured with `eslint-plugin-react` and warnings checked during the build process.

## Getting Started

### Prerequisites
*   Node.js (version 18 or higher)
*   npm

### Installation

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Screenshots

### Initial State
---
![Main UI](./contacts-app/src/screenshots/Initial_UI.png)
---

### Edition Form
---
![Edit](./contacts-app/src/screenshots/Edit_form.png)
---

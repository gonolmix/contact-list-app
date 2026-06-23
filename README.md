# Contacts App

## Features

### Functional Requirements
*   **Contact List:** Displays a list of contacts showing avatar placeholder, name, and phone.
*   **Add Contact:** Form with validation to prevent empty fields and duplicate entries (matching name and phone).
*   **Inline Edit:** Ability to edit contact details directly in the list with duplicate validation against all contacts.
*   **Delete:** Ability to delete contacts with a confirmation prompt.
*   **Search:** Real-time, case-insensitive search by name and normalized phone number.

### Technical Requirements
*   Built with **React 19** using **Vite 8**.
*   Uses **JSX**.
*   State management via `useState` hooks with immutable updates.
*   **CSS Modules** used for isolated component styles (including App.module.css).
*   **ESLint** configured with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `prop-types` validation; linting runs automatically during build.
*   **PropTypes** for runtime type checking of component props.
*   **Offline support**.

## Getting Started

### Prerequisites
*   Node.js version 20.19+ or 22.12+ (required by Vite 8)
*   npm

### Installation

1.  Navigate to the project folder:
    ```cmd
    cd contacts-app
    ```

2.  Install dependencies:
    ```cmd
    npm install
    ```

3.  Run the development server:
    ```cmd
    npm run dev
    ```

4.  Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Build and Lint

To create a production build with ESLint validation:

```cmd
npm run build
```

To check code quality manually:

```cmd
npm run lint
```

## Screenshots

### Initial State
---
![Main UI](./contacts-app/src/screenshots/Initial_UI.png)
---

### Edition Form
---
![Edit](./contacts-app/src/screenshots/Edit_form.png)
---

# Listable

## Description
Listable is a task management web application that allows users to organize their tasks into categories such as To-Do, In Progress, and Done. It features drag-and-drop functionality, real-time updates, and a clean UI with dark mode support.

## Live Demo
(https://listable-c3d50.web.app)

## Dependencies
```json
{
  "@material-tailwind/react": "^2.1.10",
  "@tailwindcss/vite": "^4.0.7",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "prop-types": "^15.8.1",
  "react": "^18.3.1",
  "react-beautiful-dnd": "^13.1.1",
  "react-dom": "^18.3.1",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.2.0",
  "sort-by": "^1.2.0",
  "tailwindcss": "^4.0.7"
}
```

## Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/listable.git
   cd listable
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure necessary environment variables (e.g., Firebase API keys).
4. Start the development server:
   ```sh
   npm run dev
   ```

## Technologies Used
- **Frontend**: React, Tailwind CSS, React Beautiful DnD
- **Backend**: Express.js, MongoDB
- **State Management**: React Hooks
- **Authentication**: Firebase
- **Deployment**: Vercel (Backend), Firebase Hosting (Frontend)

## Features
- Create, update, and delete tasks
- Drag-and-drop task organization
- Dark mode support
- Due date highlighting (Overdue tasks appear in red)
- Firebase authentication integration


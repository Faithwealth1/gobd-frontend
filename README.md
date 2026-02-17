# GOBD Admin Panel - Frontend Only

This is a frontend-only React application built with Vite.

## Features

- Admin Dashboard with user metrics
- User management interface
- Messages interface
- Car diagnostics viewer
- Chat users management
- Settings and support pages

## Installation & Setup

```bash
npm install
npm run dev
```

The application will start at `http://localhost:5173/`

## Project Structure

```
src/
├── pages/          # Page components
│   ├── dashboard.jsx
│   ├── individuals.jsx
│   ├── messages.jsx
│   ├── settings.jsx
│   └── tools/      # Shared tools and components
├── stylings/       # CSS/SCSS files
├── App.jsx
└── main.jsx
```

## Mock Data

All data is mocked for development. No backend API is required.

## Build

```bash
npm run build
npm run preview
```

## Notes

- This is a frontend-only demo application
- All data is stored locally in component state
- No persistent data storage

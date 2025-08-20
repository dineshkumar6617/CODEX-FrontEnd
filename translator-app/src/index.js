import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Imports Tailwind CSS directives
import App from './App'; // Imports your main App component

// Creates a root to render the React app inside the 'root' div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renders the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

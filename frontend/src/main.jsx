import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';

const root = document.getElementById("root");

// Forma de ver los env en VITE
// console.log(import.meta.env.VITE_BACKEND_URL)

createRoot(root).render(
    // <StrictMode>
        <App/>
    // </StrictMode>
)

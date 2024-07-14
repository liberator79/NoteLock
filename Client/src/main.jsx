import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import "./index.css"
import { UserProvider } from './context/UserContext';
import { NotesProvider } from './context/NoteContext';
ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <NotesProvider>
            <App />
        </NotesProvider>
    </UserProvider>
);
import { createContext, useState } from "react";

export const NotesContext = createContext(null);

export const NotesProvider = (props) => {
    const [notes, setNotes] = useState([]);
    const updateNote = (id, newNotes) => {
        setNotes(prevNotes => 
            prevNotes.map(note => 
                note.id === id ? { ...note, ...newNote } : note
            )
        );
    }
    return (
        <NotesContext.Provider value = {{ notes, setNotes, updateNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}
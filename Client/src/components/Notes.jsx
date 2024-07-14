import { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { NotesContext } from "../context/NoteContext";

const Notes = () => {
    const { notesId } = useParams();
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const key = localStorage.getItem("key");
    const notesState = useContext(NotesContext);
    const textRef = useRef();
    const titleRef = useRef();
    const updateItem = async () => {
        if (!textRef.current.value || !titleRef.current.value) {
            return;
        }
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/notes/" + notesId, {
                method: "PUT",
                headers: {
                    'Authorization': key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: titleRef.current.value,
                    text: textRef.current.value
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNotes(data);
            notesState.updateNote(notesId, data);

            if (textRef.current && titleRef.current) {
                textRef.current.value = data.text;
                titleRef.current.value = data.title;
            }
        } catch (error) {
            setError("Error Updating Data");
            console.error('Error updating data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let note = notesState.notes.find(note => note.id === notesId);
                if (!note) {
                    const response = await fetch("http://localhost:3000/notes/" + notesId, {
                        method: "GET",
                        headers: {
                            'Authorization': key
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    note = await response.json();
                }
                setNotes(note);

                if (textRef.current && titleRef.current) {
                    textRef.current.value = note.text;
                    titleRef.current.value = note.title;
                }
            } catch (error) {
                setError("Error Fetching Data");
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [notesId, key, notesState.notes]);

    if (loading) {
        return (
            <div className='flex justify-center items-center w-[100%] h-[100vh]'>
                <div className='w-5 h-5 border-4 m-[2px] border-white border-dashed rounded-full animate-spin '></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-3xl font-bold flex h-[100vh] w-[100%] justify-center items-center text-white">
                {error}
            </div>
        );
    }

    return (
        <div className="text-white flex items-center justify-center w-[100%] flex-col">
            {notes && (
                <>
                    <div className="font-bold p-4 text-3xl">{notes.title}</div>
                    <div className="font-bold p-4">{notes.text}</div>
                    <div className="w-[50%] flex items-end justify-end inset-x-50 bottom-10 absolute">
                        <div className="flex flex-col bg-slate-600 gap-0 items-center p-5 rounded-lg pr-6 w-[100%] shadow-green-500 shadow-sm justify-between">
                            <input
                                type="text"
                                placeholder="title"
                                className="bg-gray-800 focus:bg-gray-900 opacity-80 text-white rounded-t-md w-full p-2 focus-visible:outline-none"
                                ref={titleRef}
                                defaultValue={notes.title}
                            />
                            <div className="h-[1px] bg-green-500 w-full"></div>
                            <textarea
                                rows="5"
                                className="bg-gray-800 focus:bg-gray-900 opacity-80 text-white rounded-b-md w-[100%] p-2 focus-visible:outline-none"
                                placeholder="Notes here"
                                ref={textRef}
                                defaultValue={notes.text}
                            ></textarea>
                        </div>
                        <div className="bg-green-500 rounded-full p-2 h-fit -translate-x-4 cursor-pointer translate-y-2" onClick={updateItem}>
                            <FaEdit />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Notes;

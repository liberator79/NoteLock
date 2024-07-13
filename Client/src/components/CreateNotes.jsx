import { IoMdAdd } from "react-icons/io";
import { useState, useRef } from "react";

const CreateNotes = ({ notes, setNotes }) => {
    const title = useRef();
    const text = useRef();
    const key = "Bearer " + localStorage.getItem("key");
    const addNote = () => {
        if (text.current.value.trim() == '') {
            return null;
        }
        const postData = async () => {
            try {
                const response = await fetch("http://localhost:3000/notes", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': key
                    },
                    body: JSON.stringify({ "title": title.current.value, "text": text.current.value })
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
        postData();
        title.current.value = '';
        text.current.value = '';
        return;
    };
    

    return (
        <div className="w-[50%] flex items-end justify-end">
            <div className="flex flex-col bg-slate-600 gap-0 items-center p-5 rounded-lg pr-6 w-[100%] shadow-green-500 shadow-sm justify-between">
                <input
                    type="text"
                    placeholder="title"
                    className="bg-gray-800 focus:bg-gray-900 opacity-80 text-white rounded-t-md w-full p-2 focus-visible:outline-none"
                    ref={title}
                />
                <div className="h-[1px] bg-green-500 w-full"></div>
                <textarea
                    rows="5"
                    className="bg-gray-800 focus:bg-gray-900 opacity-80 text-white rounded-b-md w-[100%] p-2 focus-visible:outline-none"
                    placeholder="Notes here"
                    ref={text}
                    defaultValue=""
                ></textarea>
            </div>
            <div
                className="bg-green-500 rounded-full p-2 h-fit -translate-x-4 cursor-pointer translate-y-2"
                onClick={addNote}
            >
                <IoMdAdd />
            </div>
        </div>
    );
};

export default CreateNotes;

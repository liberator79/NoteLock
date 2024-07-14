
import { RouterProvider} from "react-router-dom"
import router from "./router/router"
import { useContext, useEffect } from "react";
import { NotesContext } from "./context/NoteContext";
const App = () => {
  const notesState = useContext(NotesContext);
  const key = localStorage.getItem("key");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/notes", {
          method: "GET",
          headers: {
            'Authorization': key
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        notesState.setNotes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    
      <div className="bg-slate-800 h-[100%] min-h-[100vh] w-[100%] font-sans">
        <RouterProvider router={router}/>
      </div>
  )
}

export default App

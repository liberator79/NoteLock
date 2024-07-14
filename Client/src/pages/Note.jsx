import NotesCard from "../components/NotesCard"
import CreateNotes from "../components/CreateNotes"
import Navbar from "../components/Navbar"
import { useContext } from "react"
import { NotesContext } from "../context/NoteContext"
const Note = () => {
  const notesState = useContext(NotesContext);
  const key = localStorage.getItem("key")

  const Delete = (id) => {
    const deleteReq = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': key
          }
        });
        if (response.ok) {
          const result = await response.json();
          notesState.setNotes(notesState.notes.filter((item) => {
            return item._id !== id;
          }))
        } else {
          throw new Error("Something went wrong")
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    deleteReq();

  }
  return (
    <div>
      <Navbar />
      <div className="w-[100%]  py-5 rounded-md flex items-center justify-center">
        <CreateNotes />
      </div>
      <div className="flex gap-3 justify-start p-10 flex-col h-[270px]  overflow-y-auto overflow-x-hidden">

        <div className="flex gap-5 pt-10 flex-wrap items-center justify-start ">
          {
            notesState.notes.map(({ title, text, updatedAt, _id }, index) => {
              return <NotesCard title={title} text={text} key={_id} id={_id} Delete={Delete} date={updatedAt} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Note

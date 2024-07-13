import NotesCard from "../components/NotesCard"
import CreateNotes from "../components/CreateNotes"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
const Note = () => {
  const [notes, setNotes] = useState([]);
  const key = localStorage.getItem("key")
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
        setNotes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const Delete = (id) => {
    setNotes(notes.filter((item, ind) => {
      return ind !== id;
    }))
  }
  return (
    <div>
      <Navbar />
      <div className="w-[100%]  pt-5 rounded-md flex items-center justify-center">
        <CreateNotes notes={notes} setNotes={setNotes} />
      </div>
      <div className="flex gap-3 justify-start p-10 flex-col">

        <div className="flex gap-5 pt-10 flex-wrap items-center justify-start">
          {
            notes.map(({ title, text,  updatedAt, _id}, index) => {
              return <NotesCard title={title} text={text} key={_id} id={_id} Delete={Delete} date = {updatedAt}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Note

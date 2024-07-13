import { useState } from "react"
import CreatePasswords from "../components/CreatePasswords"
import Navbar from "../components/Navbar"
import PasswordCard from "../components/PasswordCard"
const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const Delete = (id) => {
    setPasswords(passwords.filter((items, ind) => {
      return id !== ind;
    }))
  }
  return (
    <div>
      <Navbar />
      <div className="w-[100%]  pt-5 rounded-md flex items-center justify-center">
        <CreatePasswords passwords={passwords} setPasswords={setPasswords}/>
      </div>
      <div className="flex gap-3 justify-start p-10 flex-col">

        <div className="flex gap-5 pt-10 flex-wrap items-center justify-start">
          {
            passwords.map(({title, password}, id) => {
              return <PasswordCard title = {title} password={password} Delete={Delete} id = {id} key = {id}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Passwords

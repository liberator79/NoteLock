import { useState, useContext } from "react"
import CreatePasswords from "../components/CreatePasswords"
import Navbar from "../components/Navbar"
import PasswordCard from "../components/PasswordCard"
import { PasswordsContext } from "../context/PasswordsContext"
const Passwords = () => {
  const passwordState = useContext(PasswordsContext);
  const key = localStorage.getItem("key");
  const Delete = (id) => {
    const deleteReq = async () => {
      try {
        const res = await fetch(`http://localhost:3000/passwords/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': key
          }
        })
        if (res.ok) {
          passwordState.setPasswords(passwordState.passwords.filter((items) => {
            return items._id !== id;
          }))

        } else {
          throw new Error("Something wend Wrong");
        }

      } catch (e) {
        console.error("error", e);
      }
    }
    deleteReq();

  }
  return (
    <div>
      <Navbar />
      <div className="w-[100%]  pt-5 rounded-md flex items-center justify-center">
        <CreatePasswords />
      </div>
      <div className="flex gap-3 justify-start p-10 flex-col">
        <div className="flex gap-5 pt-10 flex-wrap items-center justify-start">
          {
            passwordState.passwords.map(({ title, password, _id, updatedAt }) => {
              return <PasswordCard title={title} password={password} Delete={Delete} id={_id} key={_id} updatedAt={updatedAt} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Passwords

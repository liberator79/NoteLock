import { useRef, useState, useContext } from "react"
import { IoMdAdd } from "react-icons/io";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { PasswordsContext } from "../context/PasswordsContext";
const CreatePasswords = () => {
  const title = useRef();
  const password = useRef();
  const [visible, setVisible] = useState(false);
  const passwordsState = useContext(PasswordsContext);
  const key = localStorage.getItem("key");
  const toggleVisible = () => {
    setVisible(!visible);
  }
  const addPassword = () => {
    if (title.current.value.trim() === '' || password.current.value.trim() === '') {
      return null;
    }
    const postData = async () => {
      try {
        const response = await fetch("http://localhost:3000/passwords", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': key
          },
          body: JSON.stringify({ "title": title.current.value, "password": password.current.value })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json()
        passwordsState.setPasswords([...passwordsState.passwords, data]);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    postData();
    title.current.value = '';
    password.current.value = '';
    return;
  }
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
        <div className="w-[100%] flex  items-center">
          <input
            rows="5"
            type={visible ? "text" : "password"}
            className="bg-gray-800 focus:bg-gray-900 opacity-80 text-white rounded-b-md w-[100%] p-2 focus-visible:outline-none"
            placeholder="password"
            ref={password}
          />
          <div className="w-[0%] -translate-x-7 cursor-pointer" onClick={toggleVisible}>
            {visible ? <div className="bg-slate-300 p-1 h-fit rounded-full w-fit">
              <BiSolidShow />
            </div> :
              <div className="bg-slate-300 p-1 h-fit rounded-full w-fit">
                <BiSolidHide />
              </div>
            }
          </div>
        </div>
      </div>
      <div className="bg-green-500 rounded-full p-2 h-fit -translate-x-4 cursor-pointer translate-y-2" onClick={addPassword}>
        <IoMdAdd />
      </div>
    </div>
  )
}

export default CreatePasswords

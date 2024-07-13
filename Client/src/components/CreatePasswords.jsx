import { useRef, useState } from "react"
import { IoMdAdd } from "react-icons/io";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
const CreatePasswords = ({ passwords, setPasswords }) => {
  const title = useRef();
  const password = useRef();
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  }
  const addPassword = () => {

    console.log(title.current.value)
    if (title.current.value.trim() === '' || password.current.value.trim() === '') {
      return null;
    }
    console.log("hello")
    setPasswords([...passwords, { "title": title.current.value, "password": password.current.value }]);
    title.current.value = '';
    password.current.value = '';
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



import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
const NotesCard = ({ title, text, id, Delete, date }) => {
  const navigate = useNavigate();
  const DeleteCard = () => {
    Delete(id);
  }
  return (
    <div>
      <div className='flex flex-col gap-0 text-white bg-slate-800 shadow-green-500 shadow-sm p-2 rounded-t-md w-56 h-36 justify-between'>
        <div className='overflow-hidden items-center justify-center'>
          <p className='text-white font-bold overflow-hidden text-ellipsis'>{title}</p>
        </div>
        <div className='py-4 overflow-hidden'>
          <p className='overflow-hidden text-ellipsis pb-2'>
            {text}

          </p>
        </div>

      </div>
      <div className='text-sm flex bg-gray-700 rounded-b-md justify-between p-1 text-white items-center'>
        <div >
          {date.substr(0, 10)}
        </div>
        <div className="flex items-center justify-evenly gap-2">
          <div className='p-2 rounded-full hover:bg-green-500 hover:text-black cursor-pointer'  onClick={() => { navigate("/notes/" + id) }}>
            <FaEdit />
          </div>
          <div className='p-2 rounded-full hover:bg-green-500 hover:text-black cursor-pointer' onClick={DeleteCard}>
            <MdDeleteOutline />
          </div>
        </div>

      </div>
    </div>
  )
}

export default NotesCard

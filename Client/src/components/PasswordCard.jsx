import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
const PasswordCard = ({ title, password, id, Delete, updatedAt }) => {
    const [visible, setVisible] = useState(false);
    const DeleteCard = () => {
        Delete(id);
    }
    const toggleVisible = () => {
        setVisible(!visible)
    }
    return (
        <div className=''>
            <div className='flex flex-col gap-0 text-white bg-slate-800 shadow-green-500 shadow-sm p-2 rounded-t-md w-56 h-36 justify-between'>
                <div className='overflow-hidden items-center justify-center'>
                    <p className='text-white font-bold overflow-hidden text-ellipsis'>{title}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className='py-4 overflow-hidden'>
                        <p className='overflow-hidden text-ellipsis pb-2'>
                            {
                                visible ? password : "••••••••••••••••"
                            }

                        </p>
                    </div>
                    <div className="cursor-pointer -translate-y-1" onClick={toggleVisible}>
                        {visible ? <BiSolidShow /> : <BiSolidHide />}
                    </div>
                </div>

            </div>
            <div className='text-sm flex bg-gray-700 rounded-b-md justify-between p-1 text-white items-center'>
                <div >
                    {updatedAt.substr(0, 10)}
                </div>
                <div className='p-2 rounded-full hover:bg-green-500 hover:text-black cursor-pointer' onClick={DeleteCard}>
                    <MdDeleteOutline />
                </div>
            </div>
        </div>
    )
}

export default PasswordCard

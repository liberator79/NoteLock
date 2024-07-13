import { useState, useContext } from "react";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const location = useLocation();
    const userState = useContext(UserContext)
    const navigate = useNavigate();
    const path = location.pathname
    return (
        <div className="flex justify-between items-center shadow-green-500 text-white font-bold shadow-sm">
            <div>
                <div className="flex items-center justify-start p-4 gap-10 pl-10">
                    <div className="flex flex-col ">
                        <div><Link to="/">Notes</Link></div>
                        {path == "/" ? <div className="h-[2px] bg-green-500"></div> : <div></div>}
                    </div>
                    <div className="flex flex-col">
                        <div><Link to="/passwords">Passwords</Link></div>
                        {path == "/passwords" ? <div className="h-[2px] bg-green-500"></div> : <div></div>}
                    </div>
                </div>
            </div>
            <div className="px-5 cursor-pointer" onClick={() => {
                userState.setUser(null);
                localStorage.setItem("key", "");
                navigate("/signin");
            }}>
                Logout
            </div>
        </div>
    )
}

export default Navbar

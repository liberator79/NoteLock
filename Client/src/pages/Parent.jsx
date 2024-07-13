
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
const Parent = ({ children, type }) => {
    const userState = useContext(UserContext);
    return userState.user ? children : <Navigate to = "/signin"/>
};

export default Parent;

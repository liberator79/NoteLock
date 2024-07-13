import Note from "../pages/Note"
import Passwords from "../pages/Passwords"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import { createBrowserRouter } from "react-router-dom"
import Parent from "../pages/Parent"

const router = createBrowserRouter(
    [
        {
            path: "/",
            children: [
                {
                    path: "/",
                    element: <Parent><Note /></Parent>
                },
                {
                    path: "/passwords",
                    element: <Parent><Passwords /></Parent>
                },

                {
                    path: "/signup",
                    element: <SignUp />
                }
            ]
        },
        {
            path: "/signin",
            element: <SignIn />
        },
    ]
)

export default router
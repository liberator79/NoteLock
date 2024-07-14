import Note from "../pages/Note"
import Passwords from "../pages/Passwords"
import SignIn from "../pages/SignIn"
import Notes from "../components/Notes"
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
                },
                {
                    path : "/notes/:notesId",
                    element : <Parent><Notes/></Parent>
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
import { createContext, useState } from "react";

export const PasswordsContext = createContext([]);

export const PasswordsProvider = (props) => {
    const [passwords, setPasswords] = useState([]);
    return (
        <PasswordsContext.Provider value = {{ passwords, setPasswords}}>
            {props.children}
        </PasswordsContext.Provider>
    )
}



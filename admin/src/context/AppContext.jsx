import { createContext } from "react";
<<<<<<< HEAD
=======
import {users} from '../assets/assets'
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const value = {
<<<<<<< HEAD
        
=======
        users,
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
    }

    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider
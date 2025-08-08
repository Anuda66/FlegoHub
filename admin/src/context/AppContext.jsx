import { createContext } from "react";
import {users} from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const value = {
        users,
    }

    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider
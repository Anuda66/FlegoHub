import { createContext } from "react";
import { applications } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const value = {
        applications,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;


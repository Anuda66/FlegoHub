import { createContext, useEffect, useState } from "react";
import { applications } from "../assets/assets";
import { toast } from "react-toastify";



export const AppContext = createContext();


const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false)

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
                
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }




    const value = {
        applications, token, setToken, backendUrl, userData, setUserData, loadUserProfile
    }



    useEffect(() => {
        if (token) {
            loadUserProfile        
        }
        else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;


import { createContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { toast } from "react-toastify";
import axios from "axios";
=======
import { applications } from "../assets/assets";
import { toast } from "react-toastify";


>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7

export const AppContext = createContext();


const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false)
<<<<<<< HEAD
    const [productAndPalan, setProductAndPlan] = useState([])

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData)
=======

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
                
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error);
<<<<<<< HEAD
            toast.error(error.message);
        }
    }

   
    //----------------------------------------------------------------------------------------------
    const fetchProductAndPricePalan = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/plan/planList')
            // console.log(response.data);

            if (response.data.success) {
                setProductAndPlan(response.data.data)
                 console.log(response.data.data);
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchProductAndPricePalan()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfile()
        }
        else {
            setUserData(false)
        }
    }, [token]);
=======
            toast.error(error.message)
        }
    }

>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7



    const value = {
<<<<<<< HEAD
        token, setToken, backendUrl, userData, setUserData, loadUserProfile, productAndPalan
    }


=======
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

>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;


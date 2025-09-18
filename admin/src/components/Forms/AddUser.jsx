import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'

function AddUser({ aToken }) {

    const [NIC, setNIC] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            formData.append('NIC', NIC)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('phone', phone)

            const response = await axios.post(backendUrl + '/api/user/addUser', formData, { headers: { aToken } })
            //console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message)

                setNIC('');
                setName('');
                setEmail('');
                setPassword('');
                setPhone('');
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

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div className="w-full mt-3">
                    <p>Full Name</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter user name' required />
                </div>
                <div className="w-full mt-3">
                    <p>NIC</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={(e) => setNIC(e.target.value)} value={NIC} placeholder='Enter user NIC' required />
                </div>
                <div className="w-full">
                    <p>Email</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter user email' required />
                </div>
                <div className="w-full">
                    <p>Phone</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="number" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder='Enter user phone' required />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter user password' required />
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <button type='submit' className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary cursor-pointer">
                        Add User
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddUser

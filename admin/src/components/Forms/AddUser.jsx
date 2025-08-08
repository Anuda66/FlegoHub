import React, { useState } from 'react'

function AddUser() {

    const [NIC, setNIC] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    
    return (
        <div>
            <form action="">
                <div className="w-full mt-3">
                    <p>NIC</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={(e) => setNIC(e.target.value)} value={NIC} required />
                </div>
                <div className="w-full mt-3">
                    <p>Name</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="w-full">
                    <p>Email</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="w-full">
                    <p>Phone</p>
                    <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="number" onChange={(e) => setPhone(e.target.value)} value={phone} required />
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

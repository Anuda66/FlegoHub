import React, { useState } from 'react'
import { FaCloud } from "react-icons/fa";
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function Login({ setAtoken }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      //console.log(email, password);
      const response = await axios.post(backendUrl + '/api/admin/login', { email, password })
      console.log(response);
      if (response.data.success) {
        setAtoken(response.data.aToken)
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
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center mt-30">
      <div className="flex flex-col items-center gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg">
        <div className="flex gap-2 items-center">
          <FaCloud className='text-blue-800 text-xl' /><p className='text-xl text-blue-800 font-bold'>FlegoHub</p>
        </div>
        <p className="text-2xl font-semibold">
          Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' type="email" placeholder='your@email.com' required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' type="password" placeholder='pasword' required />
        </div>
        <button type="submit" className="w-full mt-2 pt-2 pb-2 text-base text-white transition duration-300 rounded-md bg-primary hover:bg-blue-700 hover:shadow-lg cursor-pointer">
          Login
        </button>
        <p>flego@gmail.com</p>
        <p>flego123456</p>

      </div>
    </form>
  )
}

export default Login

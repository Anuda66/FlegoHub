import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloud } from "react-icons/fa";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const { token, setToken, backendUrl } = useContext(AppContext);

  const navigate = useNavigate()
  const [state, setState] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sing Up") {
        const response = await axios.post(backendUrl + '/api/user/register', { email, password, name, NIC, phone });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          navigate("/dashboard");
          
        }
        else {
          toast.error(response.data.message);
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          navigate("/dashboard");
        }
        else {
          toast.error(response.data.message);
        }
      }
    }
    catch (error) {
      toast.error(error.message)
    }

  }
 


  return (
    <div className="mb-20">
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center mt-30">
        <div className="flex flex-col items-center gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg">

          <div className="flex gap-2 items-center">
            <FaCloud className='text-blue-800 text-xl' /><p className='text-xl text-blue-800 font-bold'>FlegoHub</p>
          </div>

          <p className="text-2xl font-semibold">
            {state === "Sing Up" ? "Register on FlegoHub" : "Login"}
          </p>

          {state === "Sing Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="w-full p-2 mt-1 border rounded border-zinc-300"
                type="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          {state === "Sing Up" && (<div className="w-full">
            <p>NIC</p>
            <input
              className="w-full p-2 mt-1 border rounded border-zinc-300"
              type="text"
              onChange={(e) => setNIC(e.target.value)}
              value={NIC}
              required
            />
          </div>)}

          <div className="w-full">
            <p>Email</p>
            <input
              className="w-full p-2 mt-1 border rounded border-zinc-300"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {state === "Sing Up" && (<div className="w-full">
            <p>Phone</p>
            <input
              className="w-full p-2 mt-1 border rounded border-zinc-300"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
            />
          </div>)}

          
            <div className="w-full">
              <p>Password</p>
              <input
                className="w-full p-2 mt-1 border rounded border-zinc-300"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          

          <button type="submit" className="w-full pt-2 pb-2 text-base text-white transition duration-300 rounded-md bg-primary hover:bg-blue-700 hover:shadow-lg cursor-pointer mb-3">
            {state === "Sing Up" ? "Register Now" : "Login"}
          </button>

          {state === "Sing Up" ? (
            <p>
              {" "}
              Alrady have account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Craete an new account?{" "}
              <span
                onClick={() => setState("Sing Up")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login

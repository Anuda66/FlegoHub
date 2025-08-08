import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import menu from '../../assets/menu_icon.png'
import dropdown from '../../assets/dropdown_icon.png'
import { FaCloud } from "react-icons/fa";
import { AppContext } from '../../context/appContext';

function Navbar() {

  const [visible, setVisible] = useState(false)
  const {token, setToken} = useContext(AppContext)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token');
    //navigate('/')
  }
  
  const navigate = useNavigate()

  return (
    <div>
      <div className='fixed top-0 left-0 w-full bg-white shadow-md '>
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <div className='flex items-center justify-between py-5 font-medium'>
            <Link to={'/'} className='flex items-center gap-2'>
              <FaCloud className='text-blue-800 text-2xl' /><p className='text-2xl text-blue-800 font-bold'>FlegoHub</p>
            </Link>

            <ul className='hidden sm:flex gap-10 text-md text-gray-700 items-center '>
              <NavLink to="/" className='flex flex-col items-center gap-1 '>
                <p>Home</p>
                <hr className='w-3/4 border-none h-[2px] bg-yellow-500 hidden' />
              </NavLink>
              <NavLink to="/apps" className='flex flex-col items-center gap-1'>
                <p>Apps</p>
                <hr className='w-3/4 border-none h-[2px] bg-yellow-500 hidden' />
              </NavLink>
              <NavLink to="/about" className='flex flex-col items-center gap-1'>
                <p>About</p>
                <hr className='w-3/4 border-none h-[2px] bg-yellow-500 hidden' />
              </NavLink>
              
              <NavLink to="/contact" className='flex flex-col items-center gap-1'>
                <p>Contact</p>
                <hr className='w-3/4 border-none h-[2px] bg-yellow-500 hidden' />
              </NavLink>

              <li className='flex items-center'>
                {
                  token ?
                    <div>
                      <button onClick={()=>navigate('/dashboard')} className='btn-primary items-center py-2 px-4 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-accent hover:bg-yellow-400 cursor-pointer'>Dashboard</button>
                    </div>
                    : <button onClick={()=>navigate('/login')} className='bg-blue-800 py-2 px-4 text-white rounded-md hover:bg-blue-700 cursor-pointer'>Sign In</button>
                }
              </li>
            </ul>
            <img onClick={() => setVisible(true)} src={menu} alt='menu Icon' className='w-5 cursor-pointer sm:hidden ' />
          </div>
        </div>

        {/* Sidebar menu ----------------------------------------------------------*/}
        <div className={`absolute top-0 h-screen right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img className='h-4 rotate-180' src={dropdown} alt='' />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/'>Home</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/apps'>Apps</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/about'>About</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/contact'>Contact</NavLink>
          </div>
        </div>

      </div>

    </div>

  )
}

export default Navbar

import React, { useContext, useState, useEffect, useRef } from 'react';
import { FaCloud } from "react-icons/fa";
import profile from '../../assets/profile_pic.png'
import { FaRegBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';


const Header = () => {

  const { token, setToken, userData } = useContext(AppContext)

  const [firstName, setFirstName] = useState('')
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  const getFirstName = () => {
    const firstName = userData.name
    if (!firstName) return '';
    return (firstName.trim().split(' ')[0])
  }

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/')
  }

  // Handle clicks outside the dropdown----------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling---------------------------
    setOpen(!open);
  };

  const handleLogout = (e) => {
    e.stopPropagation(); // Prevent event bubbling-------------------------
    setToken('');
    setOpen(false); // Close dropdown after logout-------------------------
  };


  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-10">

      <Link className="flex items-center gap-2 " to={'/'} >
        <FaCloud className='text-2xl text-primary' />
        <h1 className="text-xl font-bold text-primary ">FlegoHub</h1>
      </Link>

      <div className="flex items-center space-x-4 ">
        <button className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <FaRegBell className='text-xl' />
        </button>

        <div className='group relative' ref={dropdownRef} >
          <div onClick={toggleDropdown} className="flex items-center hover:bg-gray-200 px-2 py-1 rounded-2xl cursor-pointer text-gray-600 hover:text-gray-900 ">
            <img src={userData.image} alt="User" className="h-8 w-8 rounded-full" />
            <span className="ml-2 ">{getFirstName()}</span>
            <FaCaretDown className="ml-1" />

            {
              open && (
                <div className='group-hover:block  absolute dropdown-menu right-0 top-full mt-2 '>
                  <div className='flex flex-col gap-2 w-48 py-3 px-2 bg-white text-gray-500 rounded shadow-md border border-gray-200 p-1'>
                    <div onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black p-1' >
                      <p >Profile</p>
                    </div>
                    <hr className=' border-gray-300' />
                    <div onClick={logout} className='flex items-center gap-1 cursor-pointer  hover:bg-red-50 px-1 rounded-sm py-1 text-red-500 '>
                      <HiOutlineLogout />
                      <p className=''>Logout</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
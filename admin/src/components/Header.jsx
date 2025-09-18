import React from 'react';
import { FaCloud } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = ({ setAtoken }) => {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [adminData, setAdminData] = useState('')

  const fetchAdminData = async () => {
    try {
      const aToken = localStorage.getItem('aToken');
      if (!aToken) {
        console.log('No token found');
        return;
      }
      const response = await axios.get(backendUrl + '/api/admin/profile', { headers: { aToken } })
      if (response.data.success) {
        setAdminData(response.data.adminData)
      }
      else {
        toast.error(error.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAdminData()
  }, [])


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
    setOpen(false); // Close dropdown after logout-------------------------
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-2 ">
        <FaCloud className='text-2xl text-primary' />
        <h1 className="text-xl font-bold text-primary ">FlegoHub</h1>

      </div>
      <div className="flex items-center space-x-4 ">
        <button className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <FaRegBell className='text-xl' />
        </button>

        <div className='group relative' ref={dropdownRef} >
          <div onClick={toggleDropdown} className="flex items-center hover:bg-blue-100 px-2 py-1 rounded-2xl cursor-pointer text-gray-600 hover:text-gray-900 ">
            <img src={adminData.image} alt="User" className="h-8 w-8 rounded-full" />
            <span className="ml-2 ">Admin</span>
            <FaCaretDown className="ml-1" />

            {
              open && (
                <div className='group  absolute dropdown-menu right-0 pt-80 '>
                  <div className='flex flex-col gap-2 w-80 py-3 px-4 bg-white text-gray-500 rounded shadow-md border border-gray-200 p-1'>
                    <div className='py-1'>
                      <div className='flex'>
                        <img className='w-14 h-14 rounded-full' src={adminData.image} alt="admin profile image" />
                      <div className='ml-3'>
                        <p className='cursor-pointer  text-blue-800 p-1 font-bold text-sm'>{adminData.name}</p>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">Admin</span>
                      </div>
                      </div>
                    </div>
                    <hr className=' border-gray-300' />
                    <div className='space-y-2'>
                      <p className='text-black font-bold'>Account Details</p>
                      <div className='flex justify-between'>
                        <p className=' text-black'>Name:</p><p className=''>{adminData.name}</p>
                      </div>
                      <div className='flex justify-between'>
                        <p className=' text-black'>Email:</p><p className=''>{adminData.email}</p>
                      </div>
                      <div className='flex justify-between'>
                        <p className=' text-black'>Admin ID:</p><p className='text-sm'>{adminData._id}</p>
                      </div>
                    </div>
                    <hr className=' border-gray-300' />
                    <div onClick={() => setAtoken('')} className='flex items-center gap-1 cursor-pointer  hover:bg-red-50 px-1 rounded-sm py-1 text-red-500 '>
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
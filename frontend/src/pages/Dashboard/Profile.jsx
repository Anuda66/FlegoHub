import React, { useContext, useState } from 'react'
import { useSidebar } from '../../context/SidebarContext';
import { AppContext } from '../../context/appContext';
import uploadIcon from '../../assets/upload_icon.png'
import { toast } from 'react-toastify';
import axios from 'axios';

function Profile() {

  const { isOpen, setIsOpen } = useSidebar();
  const { userData, setUserData, token, backendUrl, loadUserProfile } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try{
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('email', userData.email)
      formData.append('phone', userData.phone)

      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update', formData, {headers:{token}})

      if (data.success) {
        toast.success(data.message)
        await loadUserProfile()
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='bg-slate-100 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>

        <h1 className="text-2xl font-bold mb-6">User Profile </h1>

        <div className='max-w-lg flex flex-col gap-2 text-sm '>

          {
            isEdit
              ? <label htmlFor='image' >
                <div className='inline-block relative cursor-pointer '>
                  <img className='w-36 rounded opacity-75 ' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                  <img className='w-10 absolute bottom-12 right-12 ' src={image ? '' : uploadIcon} alt="" />
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
              </label>
              : <img className='w-36 rounded' src={userData.image} alt="profile Image" />
          }

          {
            isEdit
              ? <input className='bg-white text-3xl font-medium max-w-60 mt-4 py-1 px-2 border border-primary rounded-md w-full' type="text" onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
              : <p className='font-medium text-3xl text-neutral-800 mt-4 '>{userData.name}</p>
          }
          <hr className='bg-zinc-400 h-[1px] border-none ' />
          <div>
            <p className='text-neutral-500 underline mt-3 ' >USER INFORMATIONS</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-5 mt-3 text-neutral-700 '>
              <p className='font-medium' >NIC : </p>
              <p className='text-blue-500' >{userData.NIC}</p>
              <p className='font-medium'>Email : </p>
              {
                isEdit
                  ? <input className='bg-white py-1 px-2 border border-primary rounded-md w-full' type="text" onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} value={userData.email} />
                  : <p className='text-gray-500'>{userData.email}</p>
              }
              <p className='font-medium'>Phone : </p>
              {
                isEdit
                  ? <input className='bg-white py-1 px-2 border border-primary rounded-md w-full' type="text" onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                  : <p className='text-gray-500'>{userData.phone}</p>
              }
            </div>
          </div>
          <div className='mt-10'>
            {
              isEdit
                ? <button className=' px-8 py-2 rounded-md cursor-pointer  bg-accent hover:bg-yellow-400  hover:shadow-md ' onClick={updateUserProfileData} >Save Information</button>
                : <button className='  bg-primary hover:bg-blue-800 text-white  px-8 py-2 rounded-md cursor-pointer hover:shadow-md ' onClick={() => setIsEdit(true)}>Edit</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

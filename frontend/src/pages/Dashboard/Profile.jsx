import React, { useContext, useState } from 'react'
import { useSidebar } from '../../context/SidebarContext';
import { AppContext } from '../../context/appContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import uploadIcon from '../../assets/upload_icon.png'

function Profile() {

  const { isOpen, setIsOpen } = useSidebar();
  const { userData, setUserData, token, backendUrl, loadUserProfile } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('email', userData.email)
      formData.append('phone', userData.phone)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfile()
        setIsEdit(false)
        setImage(false)
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

  return userData && (
    <div className='bg-slate-100 min-h-screen'>
      <div className={`${isOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 duration-300`}>
        <h1 className="text-2xl font-bold mb-6">User Profile </h1>
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-'>
          <div className={`max-w-4xl mx-auto p-6`}>
            {/* Profile Card--------------------------------------------------------------------- */}
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              {/* Profile Image Section----------------------------------------------------------- */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
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
                </div>

                {/* Name Field */}
                <div className="mt-6 text-center">
                  {isEdit ? (
                    <input className='bg-white text-3xl font-bold text-center max-w-80 py-2 px-4 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 w-full' type="text" onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                  ) : (
                    <p className='font-bold text-3xl text-gray-800'>{userData.name}</p>
                  )}
                  <p className="text-gray-500 mt-2 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Last updated: Today
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                {/* User Information Header */}
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                </div>

                {/* Information Grid */}
                <div className="space-y-6">
                  {/* NIC Field */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3 md:col-span-1">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-700">NIC</span>
                    </div>
                    <p className="md:col-span-3 text-gray-600 font-medium">{userData.NIC}</p>
                  </div>

                  {/* Email Field */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3 md:col-span-1">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-700">Email</span>
                    </div>
                    {isEdit ? (
                      <input className='md:col-span-3 bg-white py-3 px-4 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 w-full' type="email" onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} value={userData.email} />
                    ) : (
                      <p className="md:col-span-3 text-gray-600 font-medium">{userData.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3 md:col-span-1">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-700">Phone</span>
                    </div>
                    {isEdit ? (
                      <input className='md:col-span-3 bg-white py-3 px-4 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 w-full' type="tel" onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                    ) : (
                      <p className="md:col-span-3 text-gray-600 font-medium">{userData.phone}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                  {isEdit ? (
                    <>
                      <button
                        className='flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer' onClick={updateUserProfileData}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </button>
                      <button
                        className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer' onClick={() => setIsEdit(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className='flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer' onClick={() => setIsEdit(true)}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

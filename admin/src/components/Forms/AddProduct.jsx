import React, { useState } from 'react'
import uplaodImage from '../../assets/upload_area.png'
import { toast } from 'react-toastify'
import { backendUrl } from '../../App'
import axios from 'axios'

function AddProduct({ aToken }) {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            formData.append('productName', productName)
            formData.append('description', description)

            image1 && formData.append('image1', image1)
            image2 && formData.append('image2', image2)
            image3 && formData.append('image3', image3)
            image4 && formData.append('image4', image4)

            const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { aToken } })
            console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message);
                
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setProductName('');
                setDescription('');
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
        <div className='mt-5'>
            <form onSubmit={onSubmitHandler}>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2 '>
                    <label htmlFor='image1'>
                        <img className='w-20' src={!image1 ? uplaodImage : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                    </label>
                    <label htmlFor='image2'>
                        <img className='w-20' src={!image2 ? uplaodImage : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                    </label>
                    <label htmlFor='image3'>
                        <img className='w-20' src={!image3 ? uplaodImage : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                    </label>
                    <label htmlFor='image4'>
                        <img className='w-20' src={!image4 ? uplaodImage : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                    </label>
                </div>
                <div className="w-full mt-3">
                    <p className='mb-2'>Product Name</p>
                    <input onChange={(e) => setProductName(e.target.value)} value={productName} className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" required placeholder='Enter product name' />
                </div>
                <div className="w-full mt-3">
                    <p className='mb-2' >Description</p>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" required placeholder='Enter product description' />
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

export default AddProduct

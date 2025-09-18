import React, { useState } from 'react'
import uplaodImage from '../../assets/upload_area.png'
import { IoIosRemoveCircle } from "react-icons/io";
import { toast } from 'react-toastify'
import { backendUrl } from '../../App'
import axios from 'axios'

function AddProduct({ aToken }) {

    const [open, setOpen] = useState(false);

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState(['']);
    const [isActive, setIsActive] = useState(true);
    const [category, setCategory] = useState('');
    const [website, setWebsite] = useState('');

    // Handle adding a new feature field
    const addFeature = () => {
        setFeatures([...features, '']);
    };

    // Handle removing a feature field
    const removeFeature = (index) => {
        if (features.length > 1) {
            const updatedFeatures = [...features];
            updatedFeatures.splice(index, 1);
            setFeatures(updatedFeatures);
        }
    };

    // Handle updating a feature
    const updateFeature = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            formData.append('productName', productName)
            formData.append('description', description)
            formData.append('category', category)
            formData.append('features', features)
            formData.append('isActive', isActive)
            formData.append('website', website)

            image1 && formData.append('image1', image1)
            image2 && formData.append('image2', image2)
            image3 && formData.append('image3', image3)
            image4 && formData.append('image4', image4)

            const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { aToken } })
            //console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message);

                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setProductName('');
                setDescription('');
                setFeatures([''])
                setIsActive(true)
                setCategory('')
                setWebsite('')
                setOpen(false);
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
        <div className='overflow-y-auto' style={{ maxHeight: '80vh' }}>
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
                <div className="w-full mt-3">
                    <p className='mb-2'>Web Site (Optional)</p>
                    <input onChange={(e) => setWebsite(e.target.value)} value={website} className="w-full p-1 mt-1 border rounded border-zinc-300" type="text"  placeholder='Enter product name' />
                </div>
                <div className="w-full mt-3">
                    <p className='mb-2' >Category</p>
                    <select className="w-full p-1 mt-1 border rounded border-zinc-300" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select category</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Automobile">Automobile</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Education">Education</option>
                        <option value="Tourism">Tourism</option>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>
                <div className="w-full mt-3">
                    <p className='mb-2' >Features (Optional)</p>
                    {features.map((feature, index) => (
                        <div key={index} className="flex mb-2">
                            <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} placeholder="Enter a feature" />
                            {features.length > 1 && (
                                <button type="button" onClick={() => removeFeature(index)}>
                                    <IoIosRemoveCircle className='text-red-500 text-lg cursor-pointer mx-2' />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="mt-2 px-4 py-1 bg-blue-700 hover:bg-primary text-white rounded cursor-pointer" onClick={addFeature}>
                        Add Feature
                    </button>
                </div>
                <div className="w-full mt-3">
                    <div className="flex items-center mb-2">
                        <input type="checkbox" id="isPopular" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="mr-2" />
                        <label htmlFor="isPopular" className="">
                            Mark as active
                        </label>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <button type='submit' className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary cursor-pointer">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct

import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../../App'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoIosRemoveCircle } from "react-icons/io";
import { MdCheckBox } from "react-icons/md";
import { ImCross } from "react-icons/im";
import uplaodImage from '../../assets/upload_area.png'
import uplodeIcon from '../../assets/upload_icon.png'

function UpdateProduct({ selectProduct, aToken }) {

  const [productData, setProductData] = useState({});
  const [isEdit, setIsEdit] = useState(false)

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const fetchProductData = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/product/sigleProduct/${selectProduct}`);
      //console.log(response.data.data);
      if (response.data.success) {
        setProductData(response.data.data);
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductData()
  }, [selectProduct]);

  const updateProductData = async () => {
    try {
      // Create FormData for file uploads---------------------------------------------------------
      const formData = new FormData();
      formData.append('productName', productData.productName || '');
      formData.append('description', productData.description || '');
      formData.append('website', productData.website || '');
      formData.append('category', productData.category || '');
      formData.append('features', JSON.stringify(productData.features?.filter(feature => feature.trim() !== '') || []));
      formData.append('isActive', productData.isActive || false);

      // Append images only if they exist--------------------------------------------------------
      image1 && formData.append('image1', image1 || '')
      image2 && formData.append('image2', image2 || '')
      image3 && formData.append('image3', image3 || '')
      image4 && formData.append('image4', image4 || '')

      const response = await axios.post(backendUrl + `/api/product/update/${selectProduct}`, formData, { headers: { aToken } })
      //console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProductData();
        setIsEdit(false);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className='overflow-y-auto' style={{ maxHeight: '80vh' }}>
      <div className='grid grid-cols-[1fr_3fr] gap-y-5 mt-3 '>
        <p>Upload Image :</p>
        {
          isEdit
            ? <div className='flex gap-2 '>
              <label htmlFor='image1'>
                <img className='w-20' src={!image1 ? !productData.images[0] ? uplaodImage : productData.images[0] : URL.createObjectURL(image1)} alt="" />
                <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
              </label>
              <label htmlFor='image2'>
                <img className='w-20' src={!image2 ? !productData.images[1] ? uplaodImage : productData.images[1] : URL.createObjectURL(image2)} alt="" />
                <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
              </label>
              <label htmlFor='image3'>
                <img className='w-20' src={!image3 ? !productData.images[2] ? uplaodImage : productData.images[2] : URL.createObjectURL(image3)} alt="" />
                <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
              </label>
              <label htmlFor='image4'>
                <img className='w-20' src={!image4 ? !productData.images[3] ? uplaodImage : productData.images[3] : URL.createObjectURL(image4)} alt="" />
                <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
              </label>
            </div>
            : <div className='flex gap-5 '>
              {productData.images && productData.images.length > 0 ? (
                productData.images.map((image, index) => (
                  <img className='w-20' key={index} src={image} alt='' />
                ))
              ) : (
                <p className='text-red-600'>No images available</p>
              )}
            </div>
        }

        <p>Product Name :</p>
        {
          isEdit
            ? <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={e => setProductData(prev => ({ ...prev, productName: e.target.value }))} value={productData.productName || ''} />
            : <p className='p-1 mt-1 border rounded border-zinc-300'>{productData.productName}</p>
        }

        <p>Description :</p>
        {
          isEdit
            ? <textarea className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={e => setProductData(prev => ({ ...prev, description: e.target.value }))} value={productData.description || ''} />
            : <p className='p-1 mt-1 border rounded border-zinc-300'>{productData.description}</p>
        }

        <p>Web Site :</p>
        {
          isEdit
            ? <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" onChange={e => setProductData(prev => ({ ...prev, website: e.target.value }))} value={productData.website || ''} />
            : <p className='p-1 mt-1 border rounded border-zinc-300'>{productData.website}</p>
        }

        <p>Category :</p>
        {
          isEdit
            ? <select className="w-full p-1 mt-1 border rounded border-zinc-300" onChange={e => setProductData(prev => ({ ...prev, category: e.target.value }))} value={productData.category || ''} >
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
            : <p className='p-1 mt-1 border rounded border-zinc-300'>{productData.category}</p>
        }

        <p>Features : </p>
        {
          isEdit
            ? <div >
              {productData.features?.map((feature, index) => (
                <div key={index} className="flex mb-2">
                  <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" value={feature} onChange={e => setProductData(prev => ({ ...prev, features: prev.features.map((f, i) => (i === index ? e.target.value : f)), }))} placeholder="Enter a feature" />
                  {productData.features.length > 1 && (
                    <button type="button" onClick={() => setProductData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index), }))}>
                      <IoIosRemoveCircle className="text-red-500 text-lg cursor-pointer mx-2" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="mt-2 px-4 py-1 bg-blue-800 hover:bg-blue-700 text-white rounded cursor-pointer" onClick={() => setProductData(prev => ({ ...prev, features: [...prev.features, ''], }))}>
                Add Feature
              </button>
            </div>
            : <ul className='p-1 mt-1 border rounded border-zinc-300'>
              {productData.features && productData.features.length > 0 ? (
                productData.features.map((feature, index) => (
                  <li className='' key={index}>✓ {feature}</li>
                ))
              ) : (
                <li className='text-red-600'>No features available</li>
              )}
            </ul>
        }

        <p>Mark as active : </p>
        {
          isEdit
            ? <div>
              <input type="checkbox" className="mr-2" checked={productData.isActive || false} onChange={e => setProductData(prev => ({ ...prev, isActive: e.target.checked }))} />
            </div>
            : <p className=''>{productData.isActive ? <MdCheckBox className='text-blue-800' /> : <ImCross className='text-blue-800 text-sm' />}</p>
        }
      </div>
      <div className='flex justify-end space-x-2'>
        {
          isEdit
            ? <div className=''>
              <button className='mt-5  bg-gray-400 hover:bg-gray-500 text-white  px-8 py-2 rounded-md cursor-pointer hover:shadow-md mr-3 ' onClick={() => setIsEdit(false)}>Cancel</button>
              <button className='mt-5 px-8 py-2 rounded-md cursor-pointer  bg-accent hover:bg-yellow-400  hover:shadow-md ' onClick={updateProductData}>Save </button>
            </div>
            : <button className='mt-5  bg-primary hover:bg-blue-800 text-white  px-8 py-2 rounded-md cursor-pointer hover:shadow-md ' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )

}

export default UpdateProduct

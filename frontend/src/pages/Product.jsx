import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/appContext'
import { useParams } from 'react-router-dom'

function Product() {

  const { productId } = useParams()
  console.log(productId);
  const { applications } = useContext(AppContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')

  const fetchProductData = async () => {
    applications.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage (item.demoImage[0])
        //console.log(item);
         return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, applications])

  return productData ? (
    <div className='px-4 sm:px-[5vw] md;px-[7vw] lg:px-[9vw] mt-32'>
      <div className='flex gap-12 sm:gap-12 flex-col md:flex-row bg-white rounded-2xl shadow-lg p-8 mb-10'>
        <div>
          <div className='flex items-center mb-5'>
            <img className='h-20' src={productData.image} alt="" />
            <p className='text-primary font-bold text-2xl'>{productData.name}</p>
          </div>
          <p className='text-xl mb-3'>Description</p>
          <hr className='border-gray-400 mb-3'/>
          <p className='text-md text-gray-600 mb-3'>{productData.description}</p>
        </div>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.demoImage.map((item, index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
      </div>
      <div className='mt-15 mb-15'>
        <p className='text-xl mb-5'>Praising</p>
        <hr className='border-gray-400 mb-10'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {
            Object.keys(productData.price).map((key, index) => (
              <div key={index} className='bg-white p-5 rounded-lg shadow-md'>
                <h3 className='text-2xl font-bold mb-2 text-primary'>{key}</h3>
                <div className='flex gap-3 items-center'>
                  <p>Price:</p><p className='text-gray-600 mb-4 font-bold text-4xl'> ${productData.price[key].price}</p>
                </div>
                <ul className='list-disc pl-5 text-gray-600'>
                  {productData.price[key].feture.map((feature, idx) => (
                    <li key={idx}>{feature} <hr className='mb-5'/></li>
                    
                  ))}
                </ul>
                <button className='bg-primary py-2 px-3 text-white rounded-md cursor-pointer hover:bg-blue-800 mt-10 items-center '>BUY NOW</button>
              </div>
            ))
          }
        
      </div>
    </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product

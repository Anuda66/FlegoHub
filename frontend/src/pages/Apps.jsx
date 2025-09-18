import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/appContext';
import { Link } from 'react-router-dom';
function Apps() {

  const { productList, productAndPalan } = useContext(AppContext)

  const [filterProducts, setFilterProduct] = useState([]);

  useEffect(() => {
    setFilterProduct(productList)
  }, [])

  return (
    <div className='pt-32 px-4 sm:px-[5vw] md;px-[7vw] lg:px-[9vw] mb-32'>
      <div className="lg:text-center mb-10">
        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">FlegoHub</h2>
        <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          All Applications
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-sm '>
      {/*product sort---------------------------------------------------------------------------------------*/}
      <div className='flex justify-end text-base sm:text-2xl mb-10 px-2'>
        <select className='border-2 border-gray-300 text-sm px-2 py-3'>
          <option value='relavent'>Sort by: Name</option>
          <option value='low-high'>Sort by: Date</option>
        </select>
      </div>

      {/* render product-----------------------------------------------------------------------------------  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {
          productAndPalan.map((item, index) => (
            <div key={index} className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300'>
              <div className="p-6">
                <img className="max-h-48" src={item.images[0]} alt='' />
                <h3 className="font-semibold text-lg py-2">{item.productName}</h3>
                
                <div className="mt-6 flex justify-end">
                  <Link to={`/product/${item._id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800">
                    Visit App
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
        </div>
    </div>
  )
}

export default Apps

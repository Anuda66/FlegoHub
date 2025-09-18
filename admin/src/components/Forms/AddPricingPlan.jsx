import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';
import { IoIosRemoveCircle } from "react-icons/io";

function AddPricingPlan({ aToken }) {

  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('LKR');
  const [features, setFeatures] = useState(['']);
  const [isPopular, setIsPopular] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [yearlyPrice, setYearlyPrice] = useState('');
  const [products, setProducts] = useState([]);
  
  // Fetch products---------------------------------------------------------------------
  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/plan/products');
      //console.log(response);

      if (response.data.success) {
        setProducts(response.data.product);

      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const pricing = {
        monthly: { price: parseFloat(monthlyPrice) },
        yearly: {
          price: parseFloat(yearlyPrice),
        }
      };

      const planData = {
        productId,
        name,
        description,
        pricing,
        currency,
        features: features.filter(feature => feature.trim() !== ''),
        isPopular,
        isVisible
      };

      const response = await axios.post(backendUrl + '/api/plan/create', planData, { headers: { aToken } });
      //console.log(response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);

        setProductId('');
        setName('');
        setDescription('');
        setCurrency('USD');
        setFeatures(['']);
        setIsPopular(false);
        setIsVisible(true);
        setMonthlyPrice('');
        setYearlyPrice('');
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

    return (
    <div className='overflow-y-auto' style={{ maxHeight: '80vh' }}>
      <form onSubmit={onSubmitHandler}>
        {/* Product Selection----------------------------------------------------------------------------------- */}
        <div className="w-full mt-3">
          <label className="mb-2">
            Product
          </label>
          <select className="w-full p-1 mt-1 border rounded border-zinc-300" value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Name */}
        <div className="w-full mt-3">
          <label className="mb-2">
            Plan Name
          </label>
          <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter plan name'/>
        </div>

        {/* Description */}
        <div className="w-full mt-3">
          <label className="mb-2">
            Description
          </label>
          <textarea className="w-full p-1 mt-1 border rounded border-zinc-300" value={description} onChange={(e) => setDescription(e.target.value)} rows="2" placeholder='Enter description' />
        </div>

        {/* Pricing Section */}
        <div className="w-full mt-3">
          <div className="">
            {/* Monthly Price */}
            <div>
              <label className="mb-2">
                Monthly Price
              </label>
              <div className="flex gap-3">
                <select className="w-full p-1 mt-1 border rounded border-zinc-300" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="LKR">LKR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
                <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="number" step="0.01" value={monthlyPrice} onChange={(e) => setMonthlyPrice(e.target.value)}  placeholder='Enter monthly Price' required/>
              </div>
            </div>

            {/* Yearly Price */}
            <div className="w-full mt-3">
              <label className="mb-2">
                Yearly Price
              </label>
              <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="number" step="0.01" value={yearlyPrice} onChange={(e) => setYearlyPrice(e.target.value)} placeholder='Enter yearly Price' required/>
            </div>
          </div>
        </div>

        {/* Features------------------------------------------------ */}
        <div className="w-full mt-3">
          <label className="">
            Features
          </label>
          {features.map((feature, index) => (
            <div key={index} className="flex mb-2">
              <input className="w-full p-1 mt-1 border rounded border-zinc-300" type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} placeholder="Enter a feature"/>
              {features.length > 1 && (
                <button type="button"  onClick={() => removeFeature(index)}>
                  <IoIosRemoveCircle className='text-red-500 text-lg cursor-pointer mx-2'/>
                </button>
              )}
            </div>
          ))}
          <button type="button" className="mt-2 px-4 py-1 bg-blue-700 hover:bg-primary text-white rounded cursor-pointer" onClick={addFeature}>
            Add Feature
          </button>
        </div>

        {/* Checkboxes-------------------------------------------------------------------------- */}
        <div className="w-full mt-3">
          <div className="flex items-center mb-2">
            <input type="checkbox" id="isPopular" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} className="mr-2"/>
            <label htmlFor="isPopular" className="">
              Mark as Popular Plan
            </label>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="isVisible" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="mr-2"/>
            <label htmlFor="isVisible" className="">
              Make Plan Visible
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button type="submit" className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary cursor-pointer">
            Create Pricing Plan
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPricingPlan

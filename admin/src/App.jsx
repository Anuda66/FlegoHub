import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import DashboardLayout from './components/Layout/DashboardLayout'
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import SingleProduct from './pages/SingleProduct';
import Subscriptions from './pages/Subscriptions';
import PricingPlan from './pages/PricingPlan';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

  const [aToken, setAtoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');

  useEffect(() => {
    localStorage.setItem('aToken', aToken)
  }, [aToken])

  return (
    <div >
      <ToastContainer />
      {aToken === ''
        ? <Login setAtoken={setAtoken} />
        :
        <>
          <Routes>
            {/* Dashborad layout---------------------------------*/}
            <Route element={<DashboardLayout setAtoken={setAtoken} />}>
              <Route path='/' element={<Dashboard aToken={aToken} />} />
              <Route path='/users' element={<Users aToken={aToken} />} />
              <Route path='/products' element={<Products aToken={aToken} />} />
              <Route path='/products/:productId' element={<SingleProduct aToken={aToken} />} />
              <Route path='/subscriptions' element={<Subscriptions aToken={aToken} />} />
              <Route path='/pricingPlan' element={<PricingPlan aToken={aToken} />} />
            </Route>
          </Routes>
        </>
      }

    </div>
  );
}

export default App;
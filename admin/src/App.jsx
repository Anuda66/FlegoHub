import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Users from './pages/Users';
import Products from './pages/Products';
import DashboardLayout from './components/Layout/DashboardLayout'
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

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
            </Route>
          </Routes>
        </>
      }

    </div>
  );
}

export default App;
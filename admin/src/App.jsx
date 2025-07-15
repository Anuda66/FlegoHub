import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Users from './pages/Users';
import Products from './pages/Products';

function App() {
  return (
    <div >
      <Sidebar />
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
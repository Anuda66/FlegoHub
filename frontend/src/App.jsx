import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Apps from './pages/Apps'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'

import MainLayout from './components/Layout/MainLayout'
import DashboardLayout from './components/Layout/DashboardLayout'

import Dashboard from './pages/Dashboard/Dashboard'
import AllServicess from './pages/Dashboard/AllServicess'

import { ToastContainer } from 'react-toastify';
import Profile from './pages/Dashboard/Profile'
import Subscriptions from './pages/Dashboard/Subscriptions'
import MyApps from './pages/Dashboard/MyApps'
import AppDetails from './pages/Dashboard/AppDetails'

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Main layout with navbar/footer */}
        <Route element={<MainLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Dashboard layout without navbar/footer */}
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/allservicess' element={<AllServicess />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/myApps' element={<MyApps />} />
          <Route path='/allservicess/:productId' element={<AppDetails />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App

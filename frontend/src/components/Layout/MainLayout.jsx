import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Main/Footer'
import Navbar from '../Main/Navbar'

function MainLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout

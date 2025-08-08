import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Dashboard/Header'
import Sidebar from '../Dashboard/Sidebar'

function DashboardLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div>
            <Header  togleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <Outlet />
        </div>
    )
}

export default DashboardLayout

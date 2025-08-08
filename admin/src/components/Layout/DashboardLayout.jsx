import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'

function DashboardLayout({setAtoken}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div>
            <Header togleSidebar={toggleSidebar} setAtoken={setAtoken} />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <Outlet />
        </div>
    )


}
export default DashboardLayout
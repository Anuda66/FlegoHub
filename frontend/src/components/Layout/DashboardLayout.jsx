import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Dashboard/Header'
import Sidebar from '../Dashboard/Sidebar'

function DashboardLayout() {

    const [darkMode, setDarkMode] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className={`${darkMode && "dark"}`}>
            <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} togleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <Outlet />
        </div>
    )
}

export default DashboardLayout

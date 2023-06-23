import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'

const Layout = () => {
    return (
        <div>
            <SidebarMenu />
            <Outlet />
        </div>
    )
}

export default Layout
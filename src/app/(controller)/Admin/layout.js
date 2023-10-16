'use client'

import React, { useEffect, useState } from 'react';
import '../../(view)/admin/adminStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSidebar from '@/app/(view)/admin_layout/sidebar/page';
import AdminHeader from '@/app/(view)/admin_layout/header/page';
import AdminSubHeader from '@/app/(view)/admin_layout/sub_header/page';

const AdminTemplate = ({ children }) => {

    const [isSidebarActive, setSidebarActive] = useState(false);
    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    };

    return (
        <div className='wrapper'>
            <div  className={`wrapper ${isSidebarActive ? 'sidebar-active' : ''} `} >
                <AdminSidebar isSidebarActive={isSidebarActive}></AdminSidebar>

                <div id="content" className='w-100'>
                    <AdminHeader  toggleSidebar={toggleSidebar}></AdminHeader>
                    <AdminSubHeader className="sticky-top"></AdminSubHeader>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminTemplate;
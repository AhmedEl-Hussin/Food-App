import React from 'react'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
    return (
        
        <>
        <NavBar/>

            <div className='d-flex'>

                <div className='bg-info'>
                    <SideBar/>
                </div> 

                <div className='w-100 bg-danger'>

                    <div className=''>
                        <Outlet/>
                    </div>

                </div>

            </div>
        </>

    )
}

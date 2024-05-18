import React from 'react'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
    return (
        
        <>

            <div className='d-flex'>

                <div className=''>
                    <SideBar/>
                </div> 

                <div className='w-100'>
                    <div className='bg-'>
                    <NavBar />

                        <Outlet/>
                    </div>
                </div>

            </div>

        </>

    )
}

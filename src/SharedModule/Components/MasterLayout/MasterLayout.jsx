import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import Header from "../Header/Header.jsx";

export default function MasterLayout({adminData}) {
    
    return (
    <>
        <div className='d-flex'>

            <div className='bg-sideBar'>
                <SideBar/>
            </div> 

            <div className='w-100'>
                <div className='container-fluid'>
                    <Navbar adminData = {adminData}/>
                    <Outlet/>
                </div>
            </div>

        </div>
    </>
    )
}

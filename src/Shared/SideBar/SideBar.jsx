import React , { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/Images/logo.png'


export default function SideBar() {


    const navigate = useNavigate()
    const [isCollapsed , setIsCollapsed] = useState(false);

    {/* ************************* to handle close ***************************** */}
    const handelToggle = ()=>{
        setIsCollapsed(!isCollapsed);
    }

    const { pathname } = useLocation()

    {/* ************************* to log out ***************************** */}
    const logout = ()=>{
        localStorage.removeItem("userToken");
        navigate("/login")
    }

    return (
        
        <>

            <div className="sideBar-container ">

                <Sidebar collapsed={isCollapsed} className=" side">

                    <Menu className="fixedd">
    {/* *************** toggle logo to close and open sidebar ************ */}
                        <MenuItem 
                            className="togel"
                            onClick={handelToggle} 
                            icon={ !isCollapsed ? <img className="centerLogo " src= {logo} ></img> 
                            : <img className="leftLogo " src= {logo} ></img> }> 
                        </MenuItem>

    {/* *************** Home button ************ */}
                        <MenuItem  
                            data-aos-delay="300" data-aos="fade-right"
                            className="mt-5"
                            icon={<i className="fa fa-home"></i>} 
                            component={<Link to="/dashboard" />}> 
                            Home
                        </MenuItem> 

    {/* *************** Users button ************ */}
                        <MenuItem 
                            data-aos-delay="500" data-aos="fade-right"
                            className=""
                            icon={<i className="fa-solid fa-users"></i>} 
                            component={<Link to="/dashboard/users" />}> 
                            Users
                        </MenuItem>

    {/* *************** Recipes button ************ */}
                        <MenuItem 
                            data-aos-delay="600" data-aos="fade-right"
                            className=""
                            icon={ <i className="fa-solid fa-diagram-project"></i> } 
                            component={<Link to="/dashboard/recipes" />}> 
                            Recipes
                        </MenuItem>

    {/* *************** Categories button ************ */}
                        <MenuItem 
                            data-aos-delay="700" data-aos="fade-right"
                            className=""
                            icon={<i className="fa-regular fa-calendar-days"></i>} 
                            component={<Link to="/dashboard/categories" />}> 
                            Categories
                        </MenuItem>

    {/* *************** Cahnge Password button ************ */}
                        <MenuItem 
                            data-aos-delay="800" data-aos="fade-right"
                            className=""
                            icon={<i className="fa-solid fa-unlock"></i>} 
                            component={<Link to="/changePassword" /> }> 
                            Change Password
                        </MenuItem>

    {/* *************** logout button ************ */}
                        <MenuItem 
                            data-aos-delay="900" data-aos="fade-right"
                            className=""
                            onClick={logout} 
                            icon={<i className="fa-solid fa-right-from-bracket"></i>}> 
                            Logout
                        </MenuItem>
                    
                    </Menu> 
                
                </Sidebar>
                
            </div>

        </>
    )
}

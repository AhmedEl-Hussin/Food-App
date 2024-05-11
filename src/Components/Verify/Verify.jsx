import React from 'react'
import logo from "../../assets/Images/logo2.png"
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


export default function Verify() {

    const {
        register,
        handleSubmit,
        formState : { errors },
    } = useForm();

    return (
        
        <>

            <div className='Auth-container'>
                <div className='overLay d-flex justify-content-center align-items-center'>

                    <div className='caption bg-white py-4'>

                        <div className='imageLogo text-center'>
                            <img className='' src= {logo} alt="" />
                        </div>

                        <form className='form m-auto mt-4 '>

                            <h3>Verify Account</h3>
                            <p className='par'>Welcome to Food App</p>

            {/* ************************* for input email ***************************** */}
                            <div className='form-group position-relative mt-4'>
                                <div className='iconInput'>
                                    <i className="fa-regular fs-5 fa-envelope"></i>
                                </div>
                                <input className=' ps-5 py-2 form-control' 
                                    placeholder= 'Enter your E-mail' 
                                    type="email" 
                                    {...register("email" , {
                                        required: true,
                                        pattern : /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                    })}
                                />
                                {errors.email && errors.email.type === "required" && (
                                    <span className='text-danger mt-4'>Email is required</span>
                                )}
                                {errors.email && errors.email.type === "pattern" && (
                                    <span className='text-danger mt-4'>invaild email</span>
                                )}
                            </div>

            {/* ************************* for OTP code ***************************** */}
                            <div className='form-group position-relative mt-4'>
                                <div className='iconInput'>
                                    <i className="fa fa-lock fs-5"></i>
                                </div>
                                <input className=' ps-5 py-2 form-control' 
                                    placeholder= 'Enter OTP Verification' 
                                    type="text" 
                                    {...register("code" , {
                                        required: true,
                                    })}
                                />

                                {errors.code && errors.code.type === "required" && (
                                    <span className='text-danger mt-4'>OTP is required</span>
                                )}
                            </div>

                            <div className='text-center mt-4 '>
                                <button className=' btn w-100 py-2 text-'>Verify</button>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        
        </>
    )
}

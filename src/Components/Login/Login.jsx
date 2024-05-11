import React from 'react'
import logo from "../../assets/Images/logo2.png"
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


export default function Login() {

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

                            <h3>Ahmed</h3>
                            <p className='par'>Welcome Back! Please enter your details</p>

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

    {/* ************************* for input password ***************************** */}
                            <div className='d-flex position-relative'>
                                <div className='form-group w-100 mt-4 position-relative'>
                                    <div className='iconInput'>
                                        <i className="fa fa-lock fs-5"></i>
                                    </div>
                                    <input className='ps-5 py-2 form-control' 
                                        placeholder='Enter your password' 
                                        type="password" 
                                        {...register("password" , {
                                            required : true,
                                            pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
                                        })}
                                    />
                                    {errors.password && errors.password.type === "required" && (
                                        <span className='text-danger mt-4'>Password is required</span>
                                    )}
                                    {errors.password && errors.password.type === "pattern" && (
                                        <span className='text-danger mt-4'>Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long</span>
                                    )}
                                </div>

                                <i class="fa-solid fa-eye iconEya fs-5"></i>

                            </div>

                            <div className=' register mt-3 d-flex justify-content-between'>
                                <Link className='text-black' to="/register" > Register Now ? </Link>
                                <Link className='publicColor' to="/requsetRestPass" > Forget Password ? </Link>
                            </div>

                            <div className='text-center mt-4 '>
                                <button className=' btn w-100 py-2 text-'>Login</button>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </>

    )
}

import React from 'react'
import logo from "../../assets/Images/logo2.png"
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

export default function Rigester() {

    const {
        register,
        handleSubmit,
        formState : { errors },
    } = useForm();

    return (
        
        <>
            <div className='Auth-container  '>
                <div className='overLay d-flex justify-content-center align-items-center'>

                    <div className='captionRegister bg-white py-4'>

                        <div className='imageLogo text-center'>
                            <img className='' src= {logo} alt="" />
                        </div>

                        <form className='form w-100 px-5 m-auto mt-4 '>

        {/* ************************* header caption ************************* */}
                            <h3>Register</h3>
                            <p className='par'>Welcome Back! Please enter your details</p>

                            <div className='row'>
            {/* ************************* for input user name ***************************** */}
                                <div className='form-group position-relative mt-4 col-md-6'>
                                    <div className='iconInput'>
                                        <i class="fa-solid fa-user fs-5"></i>
                                    </div>
                                    <input className="ps-5 py-2 form-control"
                                        placeholder="Enter your name"
                                        type="text"
                                        {...register("userName", {
                                            required: true,
                                        })}
                                    />

                                    {errors.userName && errors.userName.type === "required" && (
                                        <span className="text-danger mt-4"> userName is required </span>
                                    )}
                                </div>

            {/* ************************* for input email ***************************** */}
                                <div className='form-group position-relative mt-4 col-md-6'>
                                    <div className='iconInput'>
                                        <i className="fa-regular fs-5 fa-envelope"></i>
                                    </div>
                                    <input className='ps-5 py-2 form-control' 
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

            {/* ************************* for input countery ***************************** */}
                                <div className='form-group position-relative mt-4 col-md-6'>
                                    <div className='iconInput'>
                                        <i class="fa-solid fa-earth-americas fs-5"></i>
                                    </div>
                                    <input className="ps-5 py-2 form-control"
                                        placeholder="Enter your country"
                                        type="text"
                                        {...register("country", {
                                            required: true,
                                        })}
                                    />

                                    {errors.country && errors.country.type === "required" && (
                                        <span className="text-danger mt-4">
                                            country is required
                                        </span>
                                    )}
                                </div>

            {/* ************************* for input phone number ***************************** */}
                                <div className='form-group position-relative mt-4 col-md-6'>
                                    <div className='iconInput'>
                                        <i class="fa-solid fa-mobile-screen fs-5"></i>
                                    </div>
                                    <input className="ps-5 py-2 form-control"
                                        placeholder="Enter your phone number"
                                        type="number"
                                        {...register("phoneNumber", {
                                            required: true,
                                        })}
                                    />

                                    {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                                        <span className="text-danger mt-4"> phoneNumber is required </span>
                                    )}
                                </div>

            {/* ************************* for input new password ***************************** */}
                                <div className='d-flex position-relative col-md-6'>
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

            {/* ************************* for input confirm new password ***************************** */}
                                <div className='d-flex position-relative col-md-6'>
                                    <div className='form-group w-100 mt-4 position-relative'>
                                        <div className='iconInput'>
                                            <i className="fa fa-lock fs-5"></i>
                                        </div>
                                        <input className='ps-5 py-2 form-control' 
                                            placeholder='Confirm New Password' 
                                            id="confirmPassword"
                                            type="password"
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password",
                                                validate:{
                                                    checkNewPassConfirmationHandler:(value)=>{
                                                    const{password}=getValues();
                                                    return password === value || "Newpassword and confirmNewPassword doesn't match!!"
                                                }}
                                            })} 
                                        />

                                        {errors.confirmPassword&&(<span className="text-danger">{errors.confirmPassword?.message}</span>)}

                                    </div>
                                    <i class="fa-solid fa-eye iconEya fs-5"></i>

                                </div>

                            </div>

                            <div className=' register mt-3 d-flex justify-content-between'>
                                <Link className='text-white' ></Link>
                                <Link className='publicColor' to="/" > Login Now ? </Link>
                            </div>

                            <div className='text-center mt-4 '>
                                <button className=' btn w-75 py-2 text-'>Register</button>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}

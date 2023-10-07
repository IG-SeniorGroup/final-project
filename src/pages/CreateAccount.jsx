import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

export default function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
  
    });
      const {firstName, lastName, email, password} = formData;
    const navigate = useNavigate()
    function onChange(e){
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    }
    return (
      <div>
          <div className=''>
  
              <section className=''> 
  
              <h5 className='text-4xl p-4 text-center font-bold'>Create Account</h5>
  
              
              <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
  
                                                  {/* The left side of the code and image uploaded */}

                  <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                      <img src = "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="key" className='w-full rounded-2xl'/>
  
                  </div>
                  <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                                                        {/* The right side of the page */}

                  <form >
                                                            {/* First name and last name created */}

                      <div className='flex space-x-2'>
                          <div className='text-start w-full'>
                              <p>First name</p>
                              <input  type='text' id= "firstName" value={firstName} onChange={onChange} placeholder='Jane' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>
                          </div>
                          <div className='text-start w-full'>
                              <p>Last name</p>
                              <input  type='text' id= "lastName" value={lastName} onChange={onChange} placeholder='Doe' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>
  
                          </div>
                      </div>
                                                                {/* Email textbox */}
                      <div>
                          <p className='text-start'>Email</p>
                          <input  type='text' id= "email" value={email} onChange={onChange} placeholder='name@gmail.com' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'/>
                      

                      </div>
                                                                    {/* password textbox */}
                      <p className='text-start'>Password</p>
                      <div className='relative mb-6'>
                      <input  type={showPassword ? "text" : "password"} id= "password" value={password} onChange={onChange} placeholder='Password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>
                      {showPassword ? <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer'onClick={()=> setShowPassword((prevState)=>!prevState)}/> : <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'onClick={()=> setShowPassword((prevState)=>!prevState)} /> }
                      </div>
                                                                                {/* The submit button */}
                      <button className= "w-full bg-[#7CA0FB] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-500 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-600" type = "submit">Sign in</button>
                      <div className='mt-2 flex justify-center space-x-2'>
                          <p className='font-semibold'>Already have an account?</p>
                          <p>
                              <Link to = "/" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out mr-2'>Sign in</Link>
                          </p>
                      </div>
                  
                  </form>
                  
                  </div>
              </div>
              </section>
  </div>
      </div>
  )
}

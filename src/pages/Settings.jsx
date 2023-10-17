import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {BsFillBookmarkFill} from "react-icons/bs"
import {RiAccountCircleFill} from "react-icons/ri"
import {AiFillQuestionCircle} from "react-icons/ai"
import { firestore, collection, doc, setDoc } from './firebase';
<<<<<<< HEAD
import { getAuth } from 'firebase/auth';
=======
>>>>>>> f0c497d75f345b2943884e6e58fb2adde9310984

export default function Settings() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [change, setChange] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        description: "",
        gitHub: "",
        linkedin: "",
    })
    const {firstName, lastName, email, description, gitHub, linkedin} = formData;

    const updateUserInformation = async () => {
        const userDocRef = doc(collection(firestore, 'users'), 'user-id-here'); //HERE WE GOTTA USE A USER ID TO TEST
        const userData = {
          firstName,
          lastName,
          email,
          description,
          gitHub,
          linkedin,
        };
    
        try {
          await setDoc(userDocRef, userData, { merge: true });
          console.log('User information updated successfully.');
        } catch (error) {
          console.error('Error updating user information:', error);
        }
      };
<<<<<<< HEAD
      function onLogout(){
        auth.signOut()
        navigate("/")
      }
=======

>>>>>>> f0c497d75f345b2943884e6e58fb2adde9310984
    function onChange(e){
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }))
      }
      const handleFormSubmit = (e) => {
        e.preventDefault();
        updateUserInformation(); // Call the function to update user information in Firestore
      };
  return (
    <div className='w-full'>
        <form onSubmit={handleFormSubmit}></form>
        <section className='p-5 max-w-6xl mx-auto flex justify-center items-center flex-col'>

            <h1 className='text-center text-3xl font-bold'>Account settings</h1>
            <div className='border p-4 m-4 border-slate-300 rounded-xl w-full'>
                <p className='text-center mb-4 font-semibold text-xl'>Personal information</p>
                <form>
                    <p className='font-semibold'>First name</p>
                    <input 
                        type = "text"
                        id = "firstName"
                        value={firstName}
                        onChange={onChange}

                        disabled={!change}
                        className='mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out' />


                    <p className='font-semibold'>Last name</p>
                    <input 
                        type = "text"
                        id = "lastName"
                        value={lastName}
                        onChange={onChange}

                        disabled={!change}
                        className='mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out' />



                    <p className='font-semibold'>Email</p>
                    <input 
                        type = "text"
                        id = "email"
                        value={email}
                        onChange={onChange}

                        disabled={!change}
                        className='mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out' />


                    <p className='font-semibold'>Description</p>
                    <textarea 
                        type = "text"
                        id = "description"
                        value = {description}
                        onChange={onChange}

                        disabled={!change}
                        className='mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out'/>


                    <div className='flex space-x-5'>
                        <div className='w-full'>

                            <p className='font-semibold'>GitHub</p>
                            <input 
                                type = "text"
                                id = "gitHub"
                                value={gitHub}
                                onChange={onChange}

                                disabled={!change}
                                className='mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out' />

                        </div>
                        <div className='w-full'>

                            <p className='font-semibold'>LinkedIn</p>
                            <input 
                                type = "text"
                                id = "linkedin"
                                value={linkedin}
                                onChange={onChange}

                                disabled={!change}
                                className='mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out' />

                        </div>

                    </div>
                    <div className='flex  whitespace-nowrap text-sm sm:text-lg space-x-3'>
                        <p>
                            Do you want to make changes?

                        </p>
                        <span
                            onClick={() => {setChange((prevState) => !prevState)}}
                            className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-3 cursor-pointer'
                            >
                                {change ? "Apply change" : "Edit"}
                                

                        </span>
                        

                    </div>
                    <p onClick = {onLogout} className='text-center text-xl text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>
                            Sign out
                        </p>

                </form>
            </div>
        </section>
        <div className='flex items-center justify-center'>
            <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3'>
                
            <Link  to= "/saved-questions">

                    <button
                    className='flex items-center justify-start p-2 m-4 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-blue-500 hover:border-5'>
                        <div className='border m-3 bg-slate-200 rounded-xl'>
                        <BsFillBookmarkFill className='text-2xl bg-slate-200 m-3' /> 
                        </div>

                        <div >

                            <p className='font-semibold text-start'>Saved</p>
                            <p className='text-slate-600'>View saved questions</p>
                        </div>
                    </button>
            </Link>
            <Link  to= "/settings">

                    <button
                    className='flex items-center justify-start p-2 m-4 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-blue-500 hover:border-5'>
                        <div className='border m-3 bg-slate-200 rounded-3xl'>
                        <RiAccountCircleFill className='text-3xl bg-slate-200 m-3' /> 
                        </div>

                        <div >

                        <p className='font-semibold text-start'>Account</p>
                            <p className='text-slate-600'>View your profile</p>
                        </div>
                    </button>
            </Link>
            <Link  to= "/questions" >

                    <button
                    className='flex items-center justify-start p-2 m-4 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-blue-500 hover:border-5'>
                        <div className='border m-3 bg-slate-200 rounded-3xl'>
                        <AiFillQuestionCircle className='text-3xl bg-slate-200 m-3' /> 
                        </div>

                        <div >

                        <p className='font-semibold text-start'>Questions</p>
                            <p className='text-slate-600'>Post a question</p>
                        </div>
                    </button>
            </Link>
            </div>
        </div>
        
    </div>
  )
}
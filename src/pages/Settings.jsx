import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsFillBookmarkFill } from "react-icons/bs"
import { RiAccountCircleFill } from "react-icons/ri"
import { AiFillQuestionCircle } from "react-icons/ai"
import { firestore, collection, doc, setDoc, storage } from './firebase';
import { getAuth } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import {  ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Profilepic from '../assets/profilepic.png';
import { FaExchangeAlt } from "react-icons/fa";



export default function Settings() {


  const auth = getAuth()

  useEffect(() => {
    if (auth.currentUser) {
      const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
      getDoc(userDocRef)
        .then((doc) => {
          if (doc.exists()) {
            setFormData(doc.data());
            console.log("Document data:", doc.data());
          } else {
            console.log("No such document!");
          }
        })

        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);



  const navigate = useNavigate()
  const [change, setChange] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    gitHub: "",
    linkedin: "",
  })
  const { firstName, lastName, email, description, gitHub, linkedin } = formData;

  const updateUserInformation = async () => {
    const userDocRef = doc(collection(firestore, 'users'), auth.currentUser.uid);
    const userData = {
      firstName,
      lastName,
      email,
      description,
      gitHub,
      linkedin,
      profileImage: formData.profileImage || '',
    };
  
    // Remove undefined or null values from userData
    const filteredUserData = Object.fromEntries(Object.entries(userData).filter(([_, v]) => v !== undefined && v !== null));
  
    try {
      await setDoc(userDocRef, filteredUserData, { merge: true });
      console.log('User information updated successfully.');
      setSuccess('User information updated successfully.');
    } catch (error) {
      console.error('Error updating user information:', error);
      setError('Error updating user information.');
    }
  };
  
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0]; // Get the selected image file
  
    // Reference to Firebase Storage
    const storageRef = ref(storage, `profile_images/${auth.currentUser.uid}/${imageFile.name}`);
  
    try {
      // Upload image to Firebase Storage
      const snapshot = await uploadBytesResumable(storageRef, imageFile);
  
      // Get the image URL after successful upload
      const imageUrl = await getDownloadURL(snapshot.ref);
  
      // Update user data with the image URL
      setFormData((prevState) => ({
        ...prevState,
        profileImage: imageUrl, // Add 'profileImage' to your user data structure
      }));
  
      // Update user document in Firestore with the image URL
      const userDocRef = doc(collection(firestore, 'users'), auth.currentUser.uid);
      await setDoc(userDocRef, { profileImage: imageUrl }, { merge: true });
  
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  


  function onLogout() {
    auth.signOut()
    navigate("/")
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateUserInformation(); // Call the function to update user information in Firestore
  };
  return (
    <div className="w-full min-h-screen">
      <form onSubmit={handleFormSubmit}></form>

      <section className="p-5 max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-center text-3xl font-bold">Account settings</h1>
        <div className="border p-4 m-4 border-slate-300 bg-[#E1DFFD] rounded-xl w-full shadow-lg ">
          <p className="text-center mb-4 font-semibold text-xl">
            Personal information
          </p>
          <p className="text-center text-red-600">{error}</p>
          <p className="text-center text-green-600">{success}</p>
          <form>
            <div className='flex items-center justify-center'>
              <img
              src={formData.profileImage || Profilepic}
              alt="Profile"
              className="w-[100px] rounded-lg"
            />
            <label htmlFor="imageUpload" className=" text-center cursor-pointer bg-[#9db7f8] px-2 p-2 border-2 rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-5 shadow-lg w-[125px]">
                  Change
                </label>
            
              {/* <button htmlFor="imageUpload" className='flex items-center justify-start bg-[#9db7f8] px-2 m-2 border-2 rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-5 shadow-lg w-[125px]'>
                <div className=" m-1 bg-slate-300 rounded-full">
                  <FaExchangeAlt className="text-lg  m-3 text-blue-400" />
                </div>
                <label htmlFor="imageUpload" className="cursor-pointer text-slate-700 mt-2">
                  Change
                </label>
              </button> */}
              
            
            
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              disabled={!change}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            </div>
          
            <p className="font-semibold">First name</p>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={onChange}
              disabled={!change}
              className="mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out"
            />

            <p className="font-semibold">Last name</p>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={onChange}
              disabled={!change}
              className="mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out"
            />

            <p className="font-semibold">Email</p>
            <input
              type="text"
              id="email"
              value={email}
              onChange={onChange}
              disabled={!change}
              className="mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out"
            />
            {/* <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              disabled={!change}
              className="mb-4"
            /> */}


            <p className="font-semibold">Description</p>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              disabled={!change}
              className="mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out"
            />

            <div className="flex space-x-5">
              <div className="w-full">
                <p className="font-semibold">GitHub</p>
                <input
                  type="text"
                  id="gitHub"
                  value={gitHub}
                  onChange={onChange}
                  disabled={!change}
                  className="mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out"
                />
              </div>
              <div className="w-full">
                <p className="font-semibold">LinkedIn</p>
                <input
                  type="text"
                  id="linkedin"
                  value={linkedin}
                  onChange={onChange}
                  disabled={!change}
                  className="mb-4 w-full px-4 py-2 text-xl text-gray-600 bg-white border border-slate-200 rounded-md transition ease-in-out"
                />
              </div>
            </div>
            <div className="flex  whitespace-nowrap text-sm sm:text-lg space-x-3">
              <p>Do you want to make changes?</p>
              <span
                onClick={() => {
                  setChange((prevState) => !prevState);
                  if (change) {
                    updateUserInformation();
                  }
                }}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-3 cursor-pointer"
              >
                {change ? "Apply change" : "Edit"}
              </span>
            </div>
            <p
              onClick={onLogout}
              className="text-center text-xl text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
            >
              Sign out
            </p>
          </form>
        </div>
      </section>
      <div className="flex items-center justify-center">
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 mb-4">
          <Link to="/saved-questions">
            <button className="w-[250px] flex items-center justify-start p-2 m-4 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-blue-500 hover:border-5 shadow-md">
              <div className="border m-3 bg-slate-200 rounded-xl">
                <BsFillBookmarkFill className="text-2xl bg-slate-200 m-3" />
              </div>

              <div>
                <p className="font-semibold text-start">Saved</p>
                <p className="text-slate-600">View saved questions</p>
              </div>
            </button>
          </Link>
          <Link to={`/profile/${auth.currentUser.uid}`} >
            <button className="w-[250px] flex items-center justify-start p-2 m-4 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-blue-500 hover:border-5 shadow-md">
              <div className="border m-3 bg-slate-200 rounded-3xl">
                <RiAccountCircleFill className="text-3xl bg-slate-200 m-3" />
              </div>

              <div>
                <p className="font-semibold text-start">Account</p>
                <p className="text-slate-600">View your profile</p>
              </div>
            </button>
          </Link>
          <Link to="/post-question">
            <button className="w-[250px] flex items-center justify-start p-2 m-4 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-blue-500 hover:border-5 shadow-md">
              <div className="border m-3 bg-slate-200 rounded-3xl">
                <AiFillQuestionCircle className="text-3xl bg-slate-200 m-3" />
              </div>

              <div>
                <p className="font-semibold text-start">Questions</p>
                <p className="text-slate-600">Post a question</p>
              </div>
            </button>
          </Link>
          <Link to="/my-questions">
            <button className="w-[250px] flex items-center justify-start p-2 m-4 border rounded-xl hover:bg-blue-200 transition duration-200 ease-in-out hover:border-blue-500 hover:border-5 shadow-md">
              <div className="border m-3 bg-slate-200 rounded-3xl">
                <AiFillQuestionCircle className="text-3xl bg-slate-200 m-3" />
              </div>

              <div>
                <p className="font-semibold text-start">My questions</p>
                <p className="text-slate-600">View my questions</p>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
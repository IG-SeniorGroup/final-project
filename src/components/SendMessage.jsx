import React, { useEffect, useState } from 'react'
import { doc, firestore, getDoc } from '../pages/firebase'

export default function SendMessage({userRef}) {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("")
    useEffect(() => {
        async function getUser(){
            const docRef = doc(firestore, "users", userRef)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()){
                    setUser(docSnap.data())
            }else{
                console.log("error")
            }
            
        }
        getUser();
    },[userRef])
    function onChange(e){
        setMessage(e.target.value)
    }
  return (
    <>{user !== null && (
        <div className='flex flex-col w-full'>
            <p className='mb-3 text-[#Aib4C4]'> Send a message to {user.firstName}</p>
            <div>
                <textarea
                name = 'message'
                id = "message"
                rows = "2"
                value = {message}
                onChange = {onChange}
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md transition duration-150 ease-in-out focus:bg-white go' />

            </div>
            <a href={`mailto:${user.email}?body=${message}`}>
                <button className='mt-2 w-full px-7 py-3 bg-slate-700 text-white rounded text-sm uppercase shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg active:bg-slate-800 active:shadow-lg text-center'>
                    Send Message
                </button>
            </a>

        </div> 
    )}
    </>
  )
}

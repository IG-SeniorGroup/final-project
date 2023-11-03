import React from 'react'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [input, setInput] = useState("");
  return (
    <div className='flex justify-center max-w-9xl mx-auto'>

        <form onSubmit = "">
            
            <div className='flex space-x-1 mt-10 mb-8 '>
                
                
        
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch 
                        className='text-lg'/>
                    </div>
                    <input 
                            onChange= {(e) => setInput(e.target.value)}    
                            type='text' 
                            value={input}
                            placeholder='Find solution for your homework'
                            className=' lg:w-[600px] md:w-[300px] sm:w-[300px]  mx-auto py-4 px-8  pl-10 border-2 border-slate-400 text-md text-gray-700   rounded-full transition ease-in-out shadow-md '/>
                
                    
                </div>
                <button type="submit" class="text-white bg-[#88a8f8] hover:bg-[#7699f2] focus:ring-4 focus:outline-none focus:ring-[#7197f5] font-semibold  rounded-full text-lg px-6 py-2  ">Search</button>


                    
            </div>
            
            
            
        </form>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='w-full footer'>
        
        <p className='flex justify-center mt-4'><div style={{ paddingTop: '10px', paddingBottom: '10px' }}> 
          <img
            src="/logo.svg" 
            alt="Logo"
            style={{ height: '25px', width: 'auto' }}
            
          />
        </div></p>
        <p className='text-center pb-2 text-white'>Copyright © 2023 BrainLink </p>
        <div className='space-x-4 text-center pb-4'>
            <Link to = "/" className='underline border-r-2 border-slate-400 pr-3 text-white'>Home</Link>
            <Link to = "/explore" className='underline text-white'>Explore</Link>
        </div>

    </div>
  )
}

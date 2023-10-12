

import { useNavigate } from 'react-router';

export default function Navbar() {
    
    const navigate = useNavigate();  
    
  return (
    <div className='bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40 '> 
        <header className = "flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <h6 onClick={()=>navigate("/")} className='text-3xl font-semibold text-[#7CA0FB] cursor-pointer'>BrainLink</h6>
          </div>
          <div>
            <ul className='flex space-x-10'>
              <li className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px] border-b-transparent`}onClick={()=>navigate("/")}>Home</li>
              <li className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px] border-b-transparent `}onClick={()=>navigate("/explore")}>Explore</li>
              <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] border-b-transparent }`}onClick={()=>navigate("/login")}>Login</li>
              
            </ul>
          </div>
        </header>
    </div>
  )
}
